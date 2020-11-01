import { APIGatewayProxyHandler } from 'aws-lambda';
import products from './products-mock.json';

export const getProductsById: APIGatewayProxyHandler = async (event) => {
  console.log("getProductsById FN. Event: ", event);
  console.log("getProductsById FN. Products: ", products);

  const { id } = event?.pathParameters || {};
  const product = products.find(product => {
    return product.title === id;
  });
  console.log("product: ", product);

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(product || {}),
  };
};
