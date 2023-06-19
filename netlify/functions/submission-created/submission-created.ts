import { Handler } from '@netlify/functions'
// import axios from 'axios'
// source : https://axios-http.com/docs/intro
const axios = require('axios');

export const handler: Handler = async (event, context) => {
  const { name = 'stranger' } = event.queryStringParameters

  console.log ( 'hello (from netlify functions:create submission-created)' ) ;

  // to get the data typed in the form
  // source : https://www.raymondcamden.com/2019/01/15/customized-form-handling-on-netlify-with-serverless-functions
  let payload = JSON.parse(event.body).payload;

  console.log ( payload ) ;
  

// TESTS WITH GITHUB
/*
 - V4 (2021)
   - This new API offers a simpler way to commit changes compared to the existing Git database REST APIs.
   - TO READ : https://stackoverflow.com/questions/11301989/github-api-create-commit
   - https://github.blog/changelog/2021-09-13-a-simpler-api-for-authoring-commits/
   - https://stackoverflow.com/questions/64413379/how-to-add-a-file-to-a-git-repository-using-github-api
   
 - V3 ??? (2013) beaucoup plus compliqué
   - https://dev.to/bro3886/create-a-folder-and-push-multiple-files-under-a-single-commit-through-github-api-23kc : create blob
   - https://www.levibotelho.com/development/commit-a-file-with-the-github-api/ : avec des images
   - https://stackoverflow.com/questions/11801983/how-to-create-a-commit-and-push-into-repo-with-github-api-v3
*/

	// require('dotenv').config()

	const { GITHUB_TOKEN } = process.env; // Generate yours: https://github.com/settings/tokens/new (must have repo scope)
/*
	const { REPOSITORY_OWNER } = process.env;
	const { REPOSITORY_NAME } = process.env;
	const { BRANCH_NAME } = process.env;
	const { PGP_SIG } = process.env;
*/
	const REPOSITORY_OWNER = process.env.REPOSITORY_OWNER ;
	const REPOSITORY_NAME = process.env. REPOSITORY_NAME;
	const BRANCH_NAME = process.env.BRANCH_NAME ;
	const { PGP_SIG } = process.env;


	console.log ( 'GH : TOKEN:' + GITHUB_TOKEN) ;
	console.log ( 'GH : REPOSITORY_OWNER:' + REPOSITORY_OWNER) ;
	console.log ( 'GH : REPOSITORY_NAME:' + REPOSITORY_NAME) ;
	console.log ( 'GH : BRANCH_NAME:' + BRANCH_NAME) ;
	console.log ( 'GH : PGP_SIG:' + PGP_SIG) ;
	

	// const [ REPOSITORY_OWNER, REPOSITORY_NAME, BRANCH_NAME ] = process.argv.slice(2);

	const MODES = { FILE: '100644', FOLDER: '040000' };
	const TYPE = { BLOB: 'blob', TREE: 'tree' };

	const FILES_TO_COMMIT = [
	// {
	//	path: 'tests/sub/dir/file.md',
	//	content: '# One file!',
	//  },
	  {
		path: 'file2.md',
		mode: '100644',
		type: 'blob',
		// tree: Use either tree.sha or content to specify the contents of the entry. Using both tree.sha and content will return an error. https://docs.github.com/fr/rest/git/trees?apiVersion=2022-11-28#create-a-tree
		content: '# Root file!',
	  },
	// {
	//   path: 'existingFile.md',
	//   content: null, // Deletes the file (see how it's done below)
	// },
	];

	// see https://docs.github.com/en/rest/git/blobs?apiVersion=2022-11-28
	const CREATE_BLOB_URL = `https://api.github.com/repos/${REPOSITORY_OWNER}/${REPOSITORY_NAME}/git/blobs`;
	console.log ( 'GH : CREATE_BLOB_URL:' + CREATE_BLOB_URL) ;
	
	// See: https://docs.github.com/en/free-pro-team@latest/rest/reference/git#commits
	const COMMITS_URL = `https://api.github.com/repos/${REPOSITORY_OWNER}/${REPOSITORY_NAME}/commits`;
	console.log ( 'GH : COMMITS_URL:' + COMMITS_URL) ;

	// See: https://docs.github.com/en/free-pro-team@latest/rest/reference/git#trees
	const REPOSITORY_TREE_URL = `https://api.github.com/repos/${REPOSITORY_OWNER}/${REPOSITORY_NAME}/git/trees`;
	console.log ( 'GH : REPOSITORY_TREE_URL:' + REPOSITORY_TREE_URL) ;
	
	// See: https://docs.github.com/en/free-pro-team@latest/rest/reference/git#get-a-reference
	const REF_URL = `https://api.github.com/repos/${REPOSITORY_OWNER}/${REPOSITORY_NAME}/git/refs/heads/${BRANCH_NAME}`;
	console.log ( 'GH : REF_URL:' + REF_URL) ;
	
	
	
	const headers = {
	  // 'Accept': 'application/vnd.github+json', // application/vnd.github+json
      // "content-type": "text/plain",
      // 'X-Github-Api-Version': '2022-11-28',	 
	  'Authorization': `Bearer ${GITHUB_TOKEN}`,
	};

	// const main = async () => 
	try {

	// https://docs.github.com/en/graphql/guides/introduction-to-graphql
	// curl -H "Authorization: bearer TOKEN" https://api.github.com/graphql
	//  If you're passing a body, the GraphQL request method is POST, whether it's a query or a mutation.
	
	// https://stackoverflow.com/questions/72836597/how-to-create-new-commit-with-the-github-graphql-api
	
	let file_content = 'stackabuse.com';
	let buff = new Buffer.from(file_content);
	let base64data = buff.toString('base64');

	console.log('"' + file_content + '" converted to Base64 is "' + base64data + '"');

	let GRAPHQL_URL = "https://api.github.com/graphql" ;
	let REPO_NAME_OWNER = REPOSITORY_OWNER + "/" +  REPOSITORY_NAME ; // REPOSITORY_NAME + "/" + REPOSITORY_OWNER;
	
	// https://docs.github.com/en/graphql/reference/mutations#createcommitonbranch
	// - input  : https://docs.github.com/en/graphql/reference/input-objects#createcommitonbranchinput
	//   - expectedHeadOid  :  git rev-parse HEAD (git commit oid expected at the head of the branch prior to the commit.)
	// - output : CreateCommitOnBranchPayload - return fields
	//    - clientMutationId 
	//    - commit 
	//    - ref 	
	// fileChanges: https://docs.github.com/en/graphql/reference/input-objects#filechanges
	
	// https://docs.github.com/en/graphql/guides/forming-calls-with-graphql#example-mutation
	
	
	let gQuery0 = `{
	repository(owner: "${REPOSITORY_OWNER}", name: "${REPOSITORY_NAME}") {
				refs(first: 3, refPrefix: "refs/heads/") {
				  totalCount
				  edges {
					node {
					  name
					  target {
						... on Commit {
						  history(first: 3) {
							edges {
							  node {
								oid
								message
							  }
							}
						  }
						}
					  }
					}
				  }
				}
			  }
			}`
	
	

			
	// let gQuery2 = `query { viewer { login } }` ;
	
	
	  const graphQlResponse0 = await axios({
		url: GRAPHQL_URL,
		method: 'POST',
		headers,
		data: {
			query: gQuery0
		},
	  });
	  console.log( 'GH : graphQlResponse0:' + JSON.stringify(graphQlResponse0.data));
	  
	  let EXPECTED_HEAD_OID = graphQlResponse0.data.data.repository.refs.edges[0].node.target.history.edges[0].node.oid ; // 
	  console.log ( 'GH : testVar:' + EXPECTED_HEAD_OID ) ;
	  
	  let dataFile = EXPECTED_HEAD_OID + ".json" ;
	  let base64 = "c3RhY2thYnVzZS5jb20=" ;
	  
	let gQuery1 = `mutation{
			  createCommitOnBranch(
				input: {
				  branch: 
				  {
					repositoryNameWithOwner: "${REPO_NAME_OWNER}",
					branchName: "${BRANCH_NAME}"
				  },
				  clientMutationId: "fbab",
				  message: {headline: "headline!"},
				  fileChanges: {
					additions: {path: "${dataFile}", contents: "${base64}"}
				  }
				  expectedHeadOid: "${EXPECTED_HEAD_OID}"
				}
			  )
			  { clientMutationId }			  
			}` ;	  
	  
	  const graphQlResponse1 = await axios({
		url: GRAPHQL_URL,
		method: 'POST',
		headers,
		data: {
			query: gQuery1
		},
	  });
	  console.log( 'GH : graphQlResponse:' + JSON.stringify(graphQlResponse1.data));

	  
	  /*
	  let commitHeadSha = graphQlResponse.data.repository.refs.edges[1].node.target.edges[1].node.oid ;
	  let commitHeadMessage = graphQlResponse.data.repository.refs.edges[1].node.target.edges[1].node.message ;
	  console.log ( 'GH : commitHeadSha:' + commitHeadSha ) ;
	  console.log ( 'GH : commitHeadMessage:' + commitHeadMessage ) ;
	  */ 
	  
	  // console.log ( 'GH : graphQlResponse:' + JSON.stringify(graphQlResponse) ) ;
	
	/*
		{
			mutation m1 {
			  createCommitOnBranch(
				input: {
				  branch: 
				  {repositoryNameWithOwner: "some_repo/some_owner",
					branchName: "main"
				  },
				  message: {headline: "headline!"},
				  fileChanges: {
					additions: {path: "README.md", contents: "SGVsbG8gV29ybGQ="}
				  }
				  expectedHeadOid: "git rev-parse HEAD"
				}
			  ) 
			}
		}
	*/
	
  } catch (error) {
	console.log ( 'axios GH : ERROR' ) ;	  
    console.error(error);
  }




  
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Hello, ${name}!`,
    }),
  }
}




