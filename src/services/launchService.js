const axios = require('axios');
const moment = require('moment');

class LaunchService {
    constructor() {
        this.baseUrl = 'https://ll.thespacedevs.com/2.2.0';
    }

    async getUpcomingLaunches({ status, startDate } = {}) {
        try {
            const params = {
                limit: 10
            };

            if (status) {
                params.status = status;
            }

            if (startDate) {
                params.net__gte = moment(startDate).toISOString();
            }

            const response = await axios.get(`${this.baseUrl}/launch/upcoming/`, { params });
            return response.data.results.map(launch => ({
                name: launch.name,
                vehicle: launch.rocket.configuration.name,
                launchDate: moment(launch.net).format('YYYY-MM-DD HH:mm:ss'),
                status: launch.status.name
            }));
        } catch (error) {
            throw new Error(`Failed to fetch upcoming launches: ${error.message}`);
        }
    }
}

module.exports = new LaunchService();
