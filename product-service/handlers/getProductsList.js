'use strict';
const products = require('../products-mock.json');

module.exports.getProductsList = async (event) => {
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
