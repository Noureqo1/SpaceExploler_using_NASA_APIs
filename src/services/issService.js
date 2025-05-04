const axios = require('axios');
const moment = require('moment');

class ISSService {
    constructor() {
        this.baseUrl = 'http://api.open-notify.org';
    }

    async getCurrentLocation() {
        try {
            const response = await axios.get(`${this.baseUrl}/iss-now.json`);
            const { latitude, longitude } = response.data.iss_position;
            return {
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude),
                timestamp: moment().format('YYYY-MM-DD HH:mm:ss')
            };
        } catch (error) {
            throw new Error(`Failed to fetch ISS location: ${error.message}`);
        }
    }

    async startTracking(callback, interval = 10000) {
        const track = async () => {
            try {
                const location = await this.getCurrentLocation();
                callback(location);
            } catch (error) {
                console.error(error.message);
            }
        };

        // Initial call
        await track();
        
        // Set up polling
        return setInterval(track, interval);
    }
}

module.exports = new ISSService();
