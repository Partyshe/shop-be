import { TextileProduct } from '../models/product';
import { Store } from '../models/store';
import { getAllProducts, getProductById, createProduct } from '../repositories/products.repository';
import { getStores } from '../repositories/store.repository';

export const loadProducts = async () => {
  try {
    const [products, stores] = await Promise.all([getAllProducts(), getStores()]);
    products.forEach((product: TextileProduct) => {
      const productFromStore = stores.find((store: Store) => store.product_id === product.id);
      if (productFromStore) {
        product.count = productFromStore.count;
      }
    });

    return products;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const loadProductById = async (id) => {
  try {
    const [product, stores] = await Promise.all([getProductById(id), getStores()]);
    const store = stores.find((store) => store.product_id === product.id);
    if (store) {
      product.count = store.count;
    }
    return product;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const postProduct = async (body: Record<string, any>) => {
  validateBodyProduct(body);

  try {
    const product: TextileProduct = {
      title: body.title,
      description: body.description,
      price: body.price,
      image_url: body.image_url,
    };

    return await createProduct(product);
  } catch (err) {
    throw new Error(err.message);
  }
};

const validateBodyProduct = (bodyProduct: Record<string, any>) => {
  let error;
  if (!bodyProduct) {
    error = new Error('Invalid product was provided');
  }
  else if (!bodyProduct.price || bodyProduct.price < 0) {
    error = new Error('Invalid price was provided');
  }
  else if (!bodyProduct.title) {
    error = new Error('Invalid title was provided');
  }
  else if (!bodyProduct.description) {
    error = new Error('Invalid description was provided');
  }
  else if (!bodyProduct.img) {
    error = new Error('Invalid image_url was provided');
  }

  if (error) {
    error.name = 400;
    throw error;
  }
};