class Session {

	theVotes = [] ;

	constructor() { 
		console.info ( 'session - constructor - begin: ' ) ;
	}

	async parseJsonObject (jsonObj)
	{
		let aVote = new Vote () ;
		
		// source : https://stackoverflow.com/a/8639053
		for( var name in jsonObj ) {
			// console.info( 'session - name :' + name );
			if ( name.includes ( '_state' ) )
			{
				// console.info( 'session - jsonObj[name] :' + jsonObj[name] );		
				aVote.alphas.push ( name ) ;
				aVote.states.push ( jsonObj[name] ) ;						
			}
		}
		
		this.theVotes.push ( aVote ) ;
		
		return ( aVote ) ;
	}


	
	async read ( fileName ) {
		try {		
			// retrieve data from the file
			const FULL_FILE_URL = GH_RAW_URL + "/" + REPOSITORY_OWNER + "/" +  REPOSITORY_NAME + "/" + BRANCH_NAME + "/" + REPOSITORY_SUBDIRS + "/" + fileName ;
		
			const localJsonResponse = await axios.get(FULL_FILE_URL) ;
			const objFromJson = await localJsonResponse.data.payload.data ;
			const aVote = await this.parseJsonObject ( objFromJson ) ;
			// console.info('session - read : ' + JSON.stringify ( aVote ) ) ;
			return aVote ;
			
		} catch(localError) {
			  console.error('session - localError: ' + localError )
		}
	}

	/** 
	 * getVoteFilenames
	 * @param { object } jsonDirContent - raw information about the directory that contains the votes' files (structure of https://docs.github.com/en/rest/repos/contents?apiVersion=2022-11-28#get-repository-content)
	 * @returns { Array } strings (each being the filename of a vote)
	*/
	async filterVoteFilenames(projectDigest, sessionRank, jsonDirContent) {
		// console.info( 'session - filterVoteFilenames - begin' ) ;
		// console.info( 'session : filterVoteFilenames - typeof ( jsonDirContent )' + typeof ( jsonDirContent ) );		
		// console.info( 'session - jsonDirContent :' + JSON.stringify(jsonDirContent));

		let voteFilenames = [] ;
		let digestProjectAndSession = projectDigest + "_" + sessionRank + "_"; 

		
		// console.info( "jsonDirContent.data.length : " + jsonDirContent.data.length ) ;
		
		jsonDirContent.data.forEach( aFileObject => 
		{ 
			// console.info( 'session - extractVoteFilenames - aFileObject: '+ JSON.stringify(aFileObject) ) ;
			let theFilename = aFileObject.name ;
			if ( theFilename.includes ( digestProjectAndSession ) ) {
				// push theFilename in bag
				// console.info( "session - filterVoteFilenames - theFilename : " + theFilename ) ;
				voteFilenames.push ( theFilename ) ;
			}
		});

		// console.info( "session - filterVoteFilenames - voteFilenames: " + voteFilenames ) ;
		// console.info( "session - filterVoteFilenames - voteFilenames.length: " + voteFilenames.length ) ;
		
		return voteFilenames ;
	}
		
	async retrievedRawSessionDirContent( projectDigest, sessionRank ) {
		
		// let digestProjectAndSession = "digestp1_1_" ; 
		let FULL_URL = GH_API_ROOT + "/repos/" + REPOSITORY_OWNER + "/" +  REPOSITORY_NAME + "/contents/" + REPOSITORY_SUBDIRS ;
		
		// https://docs.github.com/en/rest/repos/contents?apiVersion=2022-11-28#get-repository-content
		// example : https://api.github.com/repos/prodageo/verycoll/contents
		// console.info ( 'session - retreivedRawSessionDirContent - FULL_URL: ' + FULL_URL ) ;
		const localJsonResponse = await axios.get(FULL_URL) ;
		return localJsonResponse ;
	}
	
	async retrieveVotesData ( voteFilenames ) {

		// iterate on list of filename returned by contents, if match project and session, put in bag
		// Visit each file and get the information

		// https://stackoverflow.com/questions/37576685/using-async-await-with-a-foreach-loop
		for ( const v of voteFilenames) {
			const aVote = await this.read( v ) ;
		}
		
			/*		
		voteFilenames.forEach ( voteFilename => 
		{
			
			const aVote = await this.read( voteFilename ) ;

			this.read( voteFilename )
			.then ( (aVote) => {
					// console.info( "getFilenames - aSession.resolve - onFulfilled: " + voteFilenames[0] ) ;
					// console.info( "getFilenames - aSession.resolve - onFulfilled: " +  JSON.stringify ( aVote ) ) ;
					// console.info( 'getJson - getFilenames - end: ' + JSON.stringify ( this.theVotes ) ) ;
				}
			);

		});
			*/
			
		return this.theVotes ;
	}
	
	async logObject ( aLabel, anObject ) {
		console.info ( 'session - logObject - ' + aLabel + ': ' + JSON.stringify ( anObject ) ) ;
		return anObject ;
	}	

}