import { APIGatewayProxyHandler } from 'aws-lambda';
import * as products from './products-mock.json';

export const getProductsList: APIGatewayProxyHandler = async (event) => {
  console.log("getProductsList FN. Event: ", event);
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(products),
  };
};

export default getProductsList;