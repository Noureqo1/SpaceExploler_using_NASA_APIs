const axios = require('axios');
require('dotenv').config();

class NasaService {
    constructor() {
        this.apiKey = process.env.NASA_API_KEY;
        this.baseUrl = 'https://api.nasa.gov';
    }

    async getAstronomyPictureOfDay() {
        try {
            const response = await axios.get(`${this.baseUrl}/planetary/apod`, {
                params: {
                    api_key: this.apiKey
                }
            });
            return response.data;
        } catch (error) {
            throw new Error(`Failed to fetch APOD: ${error.message}`);
        }
    }
}

module.exports = new NasaService();
