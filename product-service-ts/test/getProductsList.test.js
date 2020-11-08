import getProductsList from '../src/handlers/getProductsList';
import products from '../src/data/products-mock.json';
jest.mock('../src/data/products-mock.json');

describe('getProductsList', () => {
    afterEach(() => jest.resetAllMocks());
    test('getProductsList should return array of products', async () => {
        // Arrange
        products.push({title: 'test'});

        // Act
        const response = await getProductsList();

        // Assert
        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual(JSON.stringify([{title: "test"}]));
    });
});
