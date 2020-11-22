import { Client } from 'pg';
import { dbOptions } from './const';

export const getStores = async () => {
  const client = new Client(dbOptions);
  await client.connect();

  try {
    const { rows: stores } = await client.query('SELECT * FROM store');
    return stores;
  } catch (err) {
    throw new Error(`Failed to get stores due to error ${err.message}`);
  } finally {
    client.end();
  }
};