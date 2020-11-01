import { getProductsById } from './getProductsById';
import products from './products-mock.json';
jest.mock('./products-mock.json');

describe('getProductsById', () => {
  afterEach(() => jest.resetAllMocks());
  test('return product with existing id', async () => {
    // Arrange
    const testProduct = { title: 'Armani' };
    products.push(testProduct);

    // Act
    const response = await getProductsById({ pathParameters: { id: 'Armani' } });

    // Assert
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(JSON.stringify(testProduct));
  });

  test('return 404 error with invalid id', async () => {
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
});
