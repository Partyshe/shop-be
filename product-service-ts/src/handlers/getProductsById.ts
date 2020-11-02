import { APIGatewayProxyHandler } from 'aws-lambda';
import products from '../data/products-mock.json';

export const getProductsById: APIGatewayProxyHandler = async (event) => {
  console.log("getProductsById FN. Event: ", event);
  console.log("getProductsById FN. Products: ", products);

  try {
    const { id } = event?.pathParameters || {};
    const product = products.find(product => {
      return product.title === id;
    });

    if (!product) {
      const error = JSON.stringify(
        {
          statusCode: 404,
          body: JSON.stringify({message: `No product with such id ${id}`}),
        }
      );

      throw new Error(error);
    }

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(product),
    };
  } catch(error) {
    return JSON.parse(error.message);
  }
  
};
