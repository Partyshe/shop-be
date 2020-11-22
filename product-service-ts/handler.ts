import 'source-map-support/register';
import { getProductsById } from './src/handlers/getProductsById';
import { getProductsList } from './src/handlers/getProductsList';
import createProduct from './src/handlers/postProduct';

export { getProductsById, getProductsList, createProduct }
