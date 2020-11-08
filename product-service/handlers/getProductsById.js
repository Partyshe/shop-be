'use strict';
const products = require('../products-mock.json');

module.exports.getProductsById = async (event) => {
  console.log("getProductsById FN. Event: ", event);
  console.log("getProductsById FN. Products: ", products);

  const { id } = event || {};
  const product = products.find(product => {
    return product.title === id;
  });

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(product || {}),
  };
};
