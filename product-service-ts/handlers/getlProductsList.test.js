import getProductsList from './getProductsList';
import products from './products-mock.json';
jest.mock('./products-mock.json');

describe('getProductsList', () => {
    afterEach(() => jest.resetAllMocks());
    test('array of products retrieved successfully', async () => {
        // Arrange
        products.push({title: 'test'});

        // Act
        const response = await getProductsList();

        // Assert
        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual(JSON.stringify([{title: "test"}]));
    });
});
