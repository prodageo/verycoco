// from https://docs.netlify.com/functions/create/?fn-language=ts#synchronous-function-format

import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
	
  console.log ( 'hello (from hello.ts)' ) ;
  
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello World" }),
  };
};

export { handler };