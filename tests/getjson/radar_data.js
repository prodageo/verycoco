class radarData {

	constructor() { 
		// {axis:"Opportunity",value:4}
		console.info ( 'radarData - constructor' ) ;		
		/*
		this.radar = [] ; // axes 
		this.radar[0] = [] ; // array with minimum dots
		this.radar[1] = [] ; // array with maximum dots
		*/
		
		/*
		this.granularData = [] ;
		*/
		if ( false )
		{
			this.data = [
						  [//Minimum
							{axis:"Opportunity",value:4},
							{axis:"Requirements",value:3},
							{axis:"Work",value:1},
						  ],[//Maximum
							{axis:"Opportunity",value:5},
							{axis:"Requirements",value:6},
							{axis:"Work",value:2},
						  ]
						];		
			this.detailedData = [] ;
		}
		else
		{
			this.data = [] ;
			this.data[0] = [] ;
			this.data[1] = [] ;			
			this.detailedData = new sessionReport () ;
		}	
	}

	addMinWeb ( axis, value ) {
		const aDot = new radarDot ;
		aDot.constructor2( axis, value ) ;
		this.data[0].push ( aDot ) ;
		console.info ( 'radarData - addMinWeb - axis/value: ' + axis + '/' + value ) ;				
	}
		

	addMaxWeb ( axis, value ) {
		const aDot = new radarDot ;
		aDot.constructor2( axis, value ) ;
		this.data[1].push ( aDot ) ;
		console.info ( 'radarData - addMaxWeb - axis/value: ' + axis + '/' + value ) ;						
	}

		
	addDot ( axis, value ) {
		console.info ( 'radarData - addDot - axis: ' + axis ) ;		
		console.info ( 'radarData - addDot - value: ' + value ) ;
		
		let currentCount = 0 ;
		const field = 'count' + value ;
		
		if ( this.detailedData[axis] ) {

			console.info ( 'radarData - addDot - field: ' + field ) ;
			currentCount = Reflect.get(this.detailedData[axis], field )
			console.log(' - addDot - currentCount: ' + currentCount);
			// currentCount = this.detailedData[axis].[value];
		}
		else {
			this.detailedData[axis] = new axisReport () ;
		}
		// this.detailedData[axis][value]=currentCount+1;
		Reflect.set(this.detailedData[axis], field, currentCount+1);
		console.info ( 'radarData - addDot - this.granularData: ' + JSON.stringify ( this.detailedData ) ) ;		
	}
	
	generateCompiledData() {
		console.info ( 'radarData - generateCompiledData : ' + JSON.stringify ( this.granularData ) ) ;
		return this.granularData ;
	}
	
	addDotObject ( aDot ) {
		if ( this.data[0].length < 4 ) {
			this.addMinimalDot ( aDot ) ;
		}
		else
		{
			this.addMaximalDot ( aDot ) ;
		}
	}
	
	addMinimalDot ( aDot ) {
		this.data[0].push ( aDot ) ;
	}

	addMaximalDot ( aDot ) {
		this.radar[1].push ( aDot ) ;
	}
	
}