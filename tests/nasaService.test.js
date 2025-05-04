const nasaService = require('../src/services/nasaService');
const axios = require('axios');

jest.mock('axios');

describe('NasaService', () => {
    describe('getAstronomyPictureOfDay', () => {
        it('should fetch APOD data successfully', async () => {
            const mockResponse = {
                data: {
                    title: 'Test Image',
                    date: '2025-05-04',
                    url: 'https://example.com/image.jpg',
                    explanation: 'Test explanation'
                }
            };

            axios.get.mockResolvedValue(mockResponse);

            const result = await nasaService.getAstronomyPictureOfDay();
            
            expect(result).toEqual(mockResponse.data);
            expect(axios.get).toHaveBeenCalledWith(
                'https://api.nasa.gov/planetary/apod',
                expect.any(Object)
            );
        });

        it('should handle errors appropriately', async () => {
            const errorMessage = 'API Error';
            axios.get.mockRejectedValue(new Error(errorMessage));

            await expect(nasaService.getAstronomyPictureOfDay())
                .rejects
                .toThrow(`Failed to fetch APOD: ${errorMessage}`);
        });
    });
});
