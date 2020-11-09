import { APIGatewayProxyHandler } from 'aws-lambda';

import { loadProducts } from '../services/product.service';
import { getResponseObject } from '../utils/api.util';

export const getProductsList: APIGatewayProxyHandler = async (event) => {
  console.log("getProductsList FN. Event: ", event);
  try {
    const products = await loadProducts();
    return getResponseObject(
      200,
      products,
      {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      }
    );
  } catch (error) {
    return getResponseObject(
      500,
      {
        message: `Failed to retrieve products. Error message: ${error.message}`
      }
    );
  }
};

export default getProductsList;