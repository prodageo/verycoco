// https://reflectoring.io/tutorial-guide-axios/#using-axios-in-front-end-applications
// import axios from 'https://cdnjs.cloudflare.com/ajax/libs/axios/0.18.0/axios.min.js'

// const axios = require('axios');

class getJson {
	
	constructor() { 
		console.info ( 'getjson - constructor : begin' ) ;
	}
	
	// useless
	getProjectAndSessionFromFilename = function ( fileName ) {		
		return "digestp1_1_" ;
	}

	async convertRadarData ( votesData, aRadarData ) {
		console.info ( 'getjson - convertRadarData - votesData: ' + JSON.stringify ( votesData ) ) ;
		console.info ( 'getjson - convertRadarData - aRadarData: ' + JSON.stringify ( aRadarData ) ) ;
		for ( var vote_idx in votesData ) {
			// console.info ( 'getjson - convertRadarData - vote: ' + JSON.stringify ( votesData[vote_idx] ) ) ;		
			console.info ( 'getjson - convertRadarData - vote: ' + vote_idx ) ;		
			for ( var alpha_idx in votesData[vote_idx].alphas ) {
				
				const alphaName = votesData[vote_idx].alphas[alpha_idx] ;
				const stateValue = votesData[vote_idx].states[alpha_idx] ;
				
				console.info ( 'getjson - convertRadarData - alpha: ' + alphaName ) ;		
				console.info ( 'getjson - convertRadarData - state: ' + stateValue ) ;		
				
				
				aRadarData.addDot ( alphaName , stateValue ) ;
			}
		}
		
		// iterate over the axis fueled by call to addDot
		for(var anAxis in aRadarData.detailedData ) {
			console.info ( 'getjson - convertRadarData - anAxis: ' + anAxis ) ;		
			console.info ( 'getjson - convertRadarData - JSON.stringify ( anAxis) : ' + JSON.stringify ( anAxis ) ) ;
			console.info ( 'getjson - convertRadarData - typeof ( aRadarData[anAxis] ) : ' + typeof ( aRadarData.detailedData[anAxis] ) ) ;
			
			const allFields = Object.keys ( aRadarData.detailedData[anAxis] ) ;
			console.info ( 'getjson - convertRadarData - allFields : ' + allFields ) ;
			const sortedFields = Object.keys ( aRadarData.detailedData[anAxis] ).sort() ;
			console.info ( 'getjson - convertRadarData - sortedFields : ' + sortedFields ) ;
			
			var currentState = 0 ;
			for ( let aCounter of sortedFields ) {
				console.info ( 'getjson - convertRadarData - aCounter : ' + aCounter ) ;
				if ( aCounter.includes ( 'count' ) ) {
					const newState = Number ( aCounter.replace( 'count', '' ) ) ;
					 
					if ( currentState < newState ) {
						currentState = newState ;
						
						const newCounterValue = Reflect.get ( aRadarData.detailedData[anAxis], aCounter ) ;
						const localMinState = aRadarData.detailedData[anAxis].minState ;
						// const localMaxState = aRadarData.detailedData[anAxis].maxState ;
						console.info ( 'getjson - convertRadarData - localMinState : ' + localMinState ) ;
						// console.info ( 'getjson - convertRadarData - localMaxState : ' + localMaxState ) ;						
						
						console.info ( 'getjson - convertRadarData - newCounterValue : ' + newCounterValue ) ;
						
						if ( (newCounterValue > 0) && (localMinState === 0) ) { 
							aRadarData.detailedData[anAxis].minState = currentState ;
							console.info ( 'getjson - convertRadarData - minCounterValue and newCounterValue: ' + newCounterValue ) ;
						}

						if ( newCounterValue > 0 ) { 
							aRadarData.detailedData[anAxis].maxState = currentState ;
							console.info ( 'getjson - convertRadarData - maxCounterValue and newCounterValue: ' + newCounterValue ) ;
						}
					}
					else
					{
						// raise error
						throw new Error('Count fields are not ordered !');
					}
					
				}
			}
		}

		
		for(var anAxis in aRadarData.detailedData ) {
			console.info ( 'getjson - convertRadarData - anAxis: ' + anAxis ) ;			
			const anAxisWashed = anAxis.replace ( '_state', '' ) ;
			aRadarData.addMinWeb ( anAxisWashed, aRadarData.detailedData[anAxis].minState ) 
			aRadarData.addMaxWeb ( anAxisWashed, aRadarData.detailedData[anAxis].maxState ) 
		}
		
		console.info ( 'getjson - convertRadarData - aRadarData : ' + JSON.stringify ( aRadarData.data ) ) ;		
		
		return aRadarData ;
		// const result = aRadarData.generateCompiledData () ;
		/*
		const aFakeDataSet = [
					  [//Minimum
						{axis:"New",value:4},
						{axis:"Requirements",value:3},
						{axis:"Work",value:1},
					  ],[//Maximum
						{axis:"New",value:5},
						{axis:"Requirements",value:6},
						{axis:"Work",value:2},
					  ]
					];	
					
		return aFakeDataSet ;
		*/
	}
	
	async treatRadarData ( projectDigest, sessionRank ) {
		// console.info ( 'getjson - treatRadarData - digestProjectAndSession: ' + projectDigest + '/' + sessionRank ) ;		
			

		try {
			const aSession = new Session ( ) ;	
			var aRadarData = new radarData ( ) ;	
			
			const localJsonResponse = await aSession.retrievedRawSessionDirContent( projectDigest, sessionRank) ;
			const localVoteFilenames = await aSession.filterVoteFilenames ( projectDigest, sessionRank, localJsonResponse ) ;
			const localVotesData = await aSession.retrieveVotesData ( localVoteFilenames ) ;
			// const aVoid1 = await aSession.logObject ( 'localVotesData1', localVotesData ) ;
			const aRadarData2 = await this.convertRadarData ( localVotesData, aRadarData ) ;
			// return new radarData ( true ) ;
			return aRadarData2 ;
			
		} catch(localError) {
			console.error('getjson - localError: ' + localError )
		}
	}
	
	
	
	
	
	
	displayVoteData = function ( projectDigest, sessionRank, voterAccountDigest ) {
		
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