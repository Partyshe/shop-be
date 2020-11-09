import { APIGatewayProxyHandler } from 'aws-lambda';

import { loadProductById } from '../services/product.service';
import { getResponseObject } from '../utils/api.util';

const getProductId = (event) => {
  const { id } = event?.pathParameters || {};
  if(!id) {
    const error = JSON.stringify(
      getResponseObject(400, {message: `No product id was provided`})
    );

    throw new Error(error);
  }

  return id;
}

export const getProductsById: APIGatewayProxyHandler = async (event) => {
  console.log("getProductsById FN. Event: ", event);

  try {
    const id = getProductId(event);
    const product = await loadProductById(id);
    if (!product) {
      const error = JSON.stringify(
        getResponseObject(404, {message: `No product with such id ${id}`})
      );

      throw new Error(error);
    }
    
    return getResponseObject(
      200,
      product,
      {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      }
    );
  } catch(error) {
    return JSON.parse(error.message);
  }
};
