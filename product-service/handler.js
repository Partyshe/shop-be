'use strict';
const getProductsListModule = require('./handlers/getProductsList');
const getProductsByIdModule = require('./handlers/getProductsById');

module.exports.getProductsList = getProductsListModule.getProductsList;
module.exports.getProductsById = getProductsByIdModule.getProductsById;
