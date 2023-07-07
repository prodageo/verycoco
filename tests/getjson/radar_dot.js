class radarDot {

	constructor3( axis, value, weigth ) { 
		// {axis:"Opportunity",value:4}
		this.axis = axis ;
		this.value = value ;
		this.weigth = weigth ;
	}

	constructor2( axis, value ) { 
		// {axis:"Opportunity",value:4}
		this.axis = axis ;
		this.value = value ;
		this.weigth = 0 ;
	}
	
	
	constructor( ) { 
		// {axis:"Opportunity",value(state):4, weight(number of votes): 5 }
		this.axis = '' ;
		this.value = 0 ;		
		this.weigth = 0 ;		
	}
	
}