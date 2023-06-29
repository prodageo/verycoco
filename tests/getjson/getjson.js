// https://reflectoring.io/tutorial-guide-axios/#using-axios-in-front-end-applications
// import axios from 'https://cdnjs.cloudflare.com/ajax/libs/axios/0.18.0/axios.min.js'

// const axios = require('axios');

class getJson {
	
	constructor() { 
		console.log ( 'getjson - constructor : begin' ) ;
	}
	
	// useless
	getProjectAndSessionFromFilename = function ( fileName ) {		
		return "digestp1_1_" ;
	}
	
	getFilenames = function ( projectDigest, sessionRank ) {
		
		// let digestProjectAndSession = "digestp1_1_" ; 
		let digestProjectAndSession = projectDigest + "_" + sessionRank + "_"; 
		let GH_API_ROOT = "https://api.github.com" ;
		let REPOSITORY_OWNER = "prodageo" ;
		let REPOSITORY_NAME = "verycoll" ;
		let BRANCH_NAME = "main" ;
		let REPOSITORY_SUBDIRS = "/_data/votes" ;

		let FULL_URL = GH_API_ROOT + "/repos/" + REPOSITORY_OWNER + "/" +  REPOSITORY_NAME + "/contents/" + REPOSITORY_SUBDIRS ;
		// example : https://api.github.com/repos/prodageo/verycoll/contents
		
		console.log ( 'getjson - getFilenames - FULL_URL: ' + FULL_URL ) ;
		console.log ( 'getjson - getFilenames - digestProjectAndSession: ' + digestProjectAndSession ) ;		
			
			
		async function f1() {
			 try {
				  const localJsonResponse = await axios.get(FULL_URL) ;
				  console.log('getjson : success') ;
				  console.log( 'getjson - localJsonResponse :' + JSON.stringify(localJsonResponse));
				  return localJsonResponse ;
			 } catch(localError) {
				  console.log('getjson - localError: ' + localError )
			 }
		}
		
		f1().then (
			function(jsonResponse) // jsonResponse takes the value of localJsonResponse
			{
				console.log( 'getjson : typeof ( jsonResponse )' + typeof ( jsonResponse ) );		
				console.log( 'getjson - jsonResponse :' + JSON.stringify(jsonResponse));

				let voteFilenames = [] ;
				
				console.log( "jsonResponse.data.length : " + jsonResponse.data.length ) ;
				
				jsonResponse.data.forEach( aFileObject => 
				{ 
					// console.log( JSON.stringify(aFileObject) ) ;
					let theFilename = aFileObject.name ;
					if ( theFilename.includes ( digestProjectAndSession ) ) {
						// push theFilename in bag
						console.log( "theFilename : " + theFilename ) ;
						voteFilenames.push ( theFilename ) ;
					}
				});

				console.log( "voteFilenames : " + voteFilenames ) ;
				console.log( "voteFilenames.length : " + voteFilenames.length ) ;

				
			},
			function(error) // error takes the value of localError
			{
				console.log(error);
			}
		);
		
		
		
		// iterate on list of filename returned by contents, if match project and session, put in bag
		
		/*
		let labels = [];
		repeat(5, i => {
		  labels.push(`Unit ${i + 1}`);
		});
		console.log(labels);
		// → ["Unit 1", "Unit 2", "Unit 3", "Unit 4", "Unit 5"]
		*/
		
	}
	
	
	getVoteData = function ( projectDigest, sessionRank, voterAccountDigest ) {
		
	  console.log ( 'getjson - list files : begin' ) ;

			let GH_RAW_URL = "https://raw.githubusercontent.com" ;
			let REPOSITORY_OWNER = "prodageo" ;
			let REPOSITORY_NAME = "verycoll" ;
			let BRANCH_NAME = "main" ;
			// let FILE_NAME = "apple.json" ;
			
			let FULL_URL = GH_RAW_URL + "/" + REPOSITORY_OWNER + "/" +  REPOSITORY_NAME + "/" + BRANCH_NAME + "/" + FILE_NAME ;

			console.log ( 'getjson - URL: ' + FULL_URL ) ;

		
		// axios.get('https://jsonplaceholder.typicode.com/posts/1') OK
		
		/*
		const jsonResponse = await axios.get(FULL_URL)
		  .then(function (response) {
			// jsonResponse = JSON.parse ( response ) ;
			console.log( 'getjson : typeof ( response )' + typeof ( response ) );
			console.log( 'getjson : typeof ( response.data )' + typeof ( response.data ) );
			console.log(response);
		  })
		  .catch(function (error) {
			console.log(error);
		  });
		*/


		// let jsonResponse ;
		// source : https://stackoverflow.com/questions/73312100/correct-async-await-usage-with-axios
		// https://dev.to/tutrinh/basic-using-async-and-await-with-axios-ad5
		async function f1() {
			 try {
				  const localJsonResponse = await axios.get(FULL_URL) ;
				  console.log('getjson : success') ;
				  console.log( 'getjson - localJsonResponse :' + JSON.stringify(localJsonResponse));
				  return localJsonResponse ;
			 } catch(localError) {
				  console.log('getjson - localError: ' + localError )
			 }
		}
		
		f1().then (
			function(jsonResponse) // jsonResponse takes the value of localJsonResponse
			{
				console.log( 'getjson : typeof ( jsonResponse )' + typeof ( jsonResponse ) );		
				console.log( 'getjson - jsonResponse :' + JSON.stringify(jsonResponse));				
				let myFruitUI = document.querySelector('.fruit-value');
				myFruitUI.textContent = jsonResponse.data.fruit ;						
				let mySizetUI = document.querySelector('.size-value');
				mySizetUI.textContent = jsonResponse.data.size ;						
			},
			function(error) // error takes the value of localError
			{
				console.log(error);
			}
		);
			
			
	}



	testReadFile = function ( FILE_NAME ) {
		
	  console.log ( 'getjson - list files : begin' ) ;

			let GH_RAW_URL = "https://raw.githubusercontent.com" ;
			let REPOSITORY_OWNER = "prodageo" ;
			let REPOSITORY_NAME = "verycoll" ;
			let BRANCH_NAME = "main" ;
			// let FILE_NAME = "apple.json" ;
			
			let FULL_URL = GH_RAW_URL + "/" + REPOSITORY_OWNER + "/" +  REPOSITORY_NAME + "/" + BRANCH_NAME + "/" + FILE_NAME ;

			console.log ( 'getjson - URL: ' + FULL_URL ) ;

		
		// axios.get('https://jsonplaceholder.typicode.com/posts/1') OK
		
		/*
		const jsonResponse = await axios.get(FULL_URL)
		  .then(function (response) {
			// jsonResponse = JSON.parse ( response ) ;
			console.log( 'getjson : typeof ( response )' + typeof ( response ) );
			console.log( 'getjson : typeof ( response.data )' + typeof ( response.data ) );
			console.log(response);
		  })
		  .catch(function (error) {
			console.log(error);
		  });
		*/


		// let jsonResponse ;
		// source : https://stackoverflow.com/questions/73312100/correct-async-await-usage-with-axios
		// https://dev.to/tutrinh/basic-using-async-and-await-with-axios-ad5
		async function f1() {
			 try {
				  const localJsonResponse = await axios.get(FULL_URL) ;
				  console.log('getjson : success') ;
				  console.log( 'getjson - localJsonResponse :' + JSON.stringify(localJsonResponse));
				  return localJsonResponse ;
			 } catch(localError) {
				  console.log('getjson - localError: ' + localError )
			 }
		}
		
		f1().then (
			function(jsonResponse) // jsonResponse takes the value of localJsonResponse
			{
				console.log( 'getjson : typeof ( jsonResponse )' + typeof ( jsonResponse ) );		
				console.log( 'getjson - jsonResponse :' + JSON.stringify(jsonResponse));				
				let myFruitUI = document.querySelector('.fruit-value');
				myFruitUI.textContent = jsonResponse.data.fruit ;						
				let mySizetUI = document.querySelector('.size-value');
				mySizetUI.textContent = jsonResponse.data.size ;						
			},
			function(error) // error takes the value of localError
			{
				console.log(error);
			}
		);
			
			
		
		
		/* POST
		
		const jsonResponse = async () => {
		  const res = await axios({
			method: "GET",
			url: FULL_URL,
		  })
		  console.log(res)
		  return res
		};		
		*/
			
		  
			
	}

}