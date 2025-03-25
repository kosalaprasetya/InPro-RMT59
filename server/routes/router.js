const Controller = require('../controllers/controller');
const auth = require('../middlewares/authentication');
const route = require('express').Router();

// Basic routes
route.get('/', Controller.home);
route.use('/auth', require('./users.router'));
route.use(auth);
route.use('/trains', require('./trains.router'));
route.use('/stations', require('./stations.router'));
route.use('/schedules', require('./schedules.router'));

// // CRUD for Train Schedules

// // List data stations
// route.get('/stations/list/all', Controller.listAllStations);

// // List data trains
// route.get('/trains/list/all', Controller.listAllTrains);

// // List data stations with passing trains
// route.get('/stations/with-passing-trains', Controller.listStationsWithPassingTrains);

// // List data stations with stopping trains
// route.get('/stations/with-stopping-trains', Controller.listStationsWithStoppingTrains);

// // List data stations by operational area
// route.get('/stations/by-area/:area', Controller.listStationsByOperationalArea);

// // List data trains with stations they pass through
// route.get('/trains/with-passing-stations', Controller.listTrainsWithPassingStations);

// // List data trains with stations they stop at
// route.get('/trains/with-stopping-stations', Controller.listTrainsWithStoppingStations);

module.exports = route;

module.exports = route;
