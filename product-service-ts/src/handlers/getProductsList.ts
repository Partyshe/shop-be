import { APIGatewayProxyHandler } from 'aws-lambda';
import products from '../data/products-mock.json';
import { getResponseObject } from '../utils/api.util';

export const getProductsList: APIGatewayProxyHandler = async (event) => {
  console.log("getProductsList FN. Event: ", event);
  return getResponseObject(
    200,
    products,
    {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    }
  );
};

export default getProductsList;