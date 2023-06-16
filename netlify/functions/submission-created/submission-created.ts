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
  
  // Fake API request : https://reqres.in/api/users?page=2
  // use axios
  
  // TO TEST
  // https://webhook.site/ : emulate an endpoint on a unique address (URL) that monitor all the calls
  //  click on edit to specify a return value (that will appear in axios response.data 
  // https://resttesttest.com/ : to test the emulation
  
  console.log ( 'axios : BEGIN' ) ;
  // axios.get('https://reqres.in/api/users?page=2', 
  
  /*
  axios.get('https://webhook.site/b97b382c-d86d-4294-bb5e-3380fe8cc04d',
     {
		params: {
		  ID: 12345
    } 
  } 
  )*/
  
  // https://answers.netlify.com/t/netlify-functions-axios-get-not-working-in-production/39171/4 : 
  
  let url = 'https://webhook.site/b97b382c-d86d-4294-bb5e-3380fe8cc04d' ;
  
  try {
    const response = await axios.get(url);
	console.log ( 'axios : RESPONSE' ) ;	
    console.log(response);
  } catch (error) {
	console.log ( 'axios : ERROR' ) ;	  
    console.error(error);
  }
  
  /* local : OK / production : KO 
  axios.get()
  .then(function (response) {
	console.log ( 'axios : RESPONSE' ) ;	  
    console.log(response);
  })
  .catch(function (error) {
	console.log ( 'axios : ERROR' ) ;
    console.log(error);
  })
  .finally(function () {
	console.log ( 'axios : FINALLY' ) ;
  // always executed
  }); 
  */
  
  
  // end of axios request

  console.log ( 'axios : END' ) ;
  
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Hello, ${name}!`,
    }),
  }
}
