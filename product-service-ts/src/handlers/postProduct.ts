import { postProduct } from '../services/product.service';
import { getResponseObject } from '../utils/api.util';

const createProduct = async ({ body }) => {
  try {
    console.log(`Incoming request ${body}`);
    const product = await postProduct(JSON.parse(body));

    if (!product) {
      return getResponseObject(500, { message: `Failed to create product` });
    }

    return getResponseObject(201, product);
  } catch (error) {
    return getResponseObject(error.name, { message: error.message });
  }
};

export default createProduct;
