import { APIGatewayProxyHandler } from 'aws-lambda';
import products from '../data/products-mock.json';
import { getResponseObject } from '../utils/api.util';

export const getProductsById: APIGatewayProxyHandler = async (event) => {
  console.log("getProductsById FN. Event: ", event);
  console.log("getProductsById FN. Products: ", products);

  try {
    const { id } = event?.pathParameters || {};
    if(!id) {
      const error = JSON.stringify(
        getResponseObject(400, {message: `No product id was provided`})
      );

      throw new Error(error);
    }

    const product = products.find(product => {
      return product.title === id;
    });
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
