const nasaService = require('./services/nasaService');
const issService = require('./services/issService');
const launchService = require('./services/launchService');

async function displayAPOD() {
    try {
        const apod = await nasaService.getAstronomyPictureOfDay();
        console.log('\n🌟 Astronomy Picture of the Day');
        console.log('================================');
        console.log(`Title: ${apod.title}`);
        console.log(`Date: ${apod.date}`);
        console.log(`Image URL: ${apod.url}`);
        console.log(`Explanation: ${apod.explanation}\n`);
    } catch (error) {
        console.error('Error fetching APOD:', error.message);
    }
}

function startISSTracking() {
    console.log('\n🛸 ISS Location Tracker');
    console.log('=====================');
    
    issService.startTracking((location) => {
        console.log(`Time: ${location.timestamp}`);
        console.log(`Latitude: ${location.latitude}`);
        console.log(`Longitude: ${location.longitude}\n`);
    });
}

async function displayUpcomingLaunches() {
    try {
        console.log('\n🚀 Upcoming Space Launches');
        console.log('========================');
        const launches = await launchService.getUpcomingLaunches();
        if (launches.length === 0) {
            console.log('No upcoming launches found.');
            return;
        }

        launches.forEach(launch => {
            console.log(`\nMission: ${launch.name}`);
            console.log(`Vehicle: ${launch.vehicle}`);
            console.log(`Launch Date: ${launch.launchDate}`);
            console.log(`Status: ${launch.status}`);
        });
    } catch (error) {
        console.error('Error fetching launches:', error.message);
    }
}

async function main() {
    console.log('🌎 Space Explorer');
    console.log('================\n');
    await displayAPOD();
    startISSTracking();
    await displayUpcomingLaunches();
}

main();
