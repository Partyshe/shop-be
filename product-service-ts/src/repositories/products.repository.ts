import { Client } from 'pg';
import { TextileProduct } from '../models/product';
import { dbOptions } from './const';
import { createProductQuery } from '../../db-scripts/create-product';

export const getAllProducts = async () => {
  const client = new Client(dbOptions);
  await client.connect();

  try {
    const { rows: products } = await client.query('SELECT * FROM product');
    return products;
  } catch (err) {
    throw new Error(`Failed to get products due to error ${err.message}`);
  } finally {
    client.end();
  }
};

export const getProductById = async (id) => {
  const client = new Client(dbOptions);
  await client.connect();

  try {
    const { rows: product } = await client.query('SELECT * FROM product WHERE id = $1', [id]);
    return product[0];
  } catch (err) {
    throw new Error(`Failed to get product by title ${id}`);
  } finally {
    client.end();
  }
};

const isProductNotCorrect = (product: TextileProduct) => {
  return (
    !product ||
      typeof product.description !== 'string' ||
      typeof product.title !== 'string' ||
      typeof product.price !== 'number' ||
      typeof product.image_url !== 'string' ||
      typeof product.count !== 'number'
  );
}

export const createProduct = async (product: TextileProduct) => {
  try {
    console.log('METHOD: createProduct. Product: ', product);

    const client = new Client(dbOptions);
    await client.connect();

    if (isProductNotCorrect(product)) {
      const error = new Error('Bad inputs were provided');
      error.name = '400';
      throw error;
    }

    const dbResponse = await client.query(
      createProductQuery,
      [
        product.description,
        product.title,
        product.price,
        product.image_url,
        product.count
      ]
    );
    const { product_id: productId } =  dbResponse.rows[0];
    client.end();

    if (!productId) {
      const error = new Error('Product was not added');
      error.name = '400';
      throw error;
    }

    console.log('Created product id', productId);

    return {...product, id: productId} as TextileProduct;
  } catch (e) {
    console.log('Error: ', e);

    const error = new Error('Error during posting data');
    error.name = '500';
    throw error;
  }
};
