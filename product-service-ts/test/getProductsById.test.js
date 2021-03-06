import { getProductsById } from '../src/handlers/getProductsById';
import products from '../src/data/products-mock.json';
jest.mock('../src/data/products-mock.json');

describe('getProductsById', () => {
  afterEach(() => jest.resetAllMocks());

  test('getProductsById should return product with existing id', async () => {
    // Arrange
    const testProduct = { title: 'Armani' };
    products.push(testProduct);

    // Act
    const response = await getProductsById({ pathParameters: { id: 'Armani' } });

    // Assert
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(JSON.stringify(testProduct));
  });

  test('getProductsById should return 404 error with invalid id', async () => {
    // Arrange
    products.push({ title: 'Some' });

    // Act
    const response = await getProductsById({ pathParameters: { id: 'Test' } });

    // Assert
    expect(response.statusCode).toEqual(404);
    expect(response.body).toEqual(
      JSON.stringify({ message: 'No product with such id Test' })
    );
  });

  test('getProductsById should return 400 error without id', async () => {
    // Act
    const response = await getProductsById({ pathParameters: { id: '' } });

    // Assert
    expect(response.statusCode).toEqual(400);
    expect(response.body).toEqual(
      JSON.stringify({ message: 'No product id was provided' })
    );
  });
});
