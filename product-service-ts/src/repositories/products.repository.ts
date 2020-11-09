import { Client } from 'pg';
import { TextileProduct } from '../models/product';
import { dbOptions } from './const';

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
    throw new Error(`Failed to get product by id ${id}`);
  } finally {
    client.end();
  }
};

export const createProduct = async (product: TextileProduct) => {
  const client = new Client(dbOptions);
  await client.connect();
  try {
    const {
      rows: results,
    } = await client.query(
      'INSERT INTO product(title, description, price, img) VALUES($1, $2, $3, $4) RETURNING *',
      [product.title, product.description, product.price, product.image_url]
    );
    return results[0];
  } catch (err) {
    throw new Error(`Failed to create product ${product}`);
  } finally {
    client.end();
  }
};
