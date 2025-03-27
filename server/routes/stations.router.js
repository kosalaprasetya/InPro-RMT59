const Controller = require('../controllers/stations.controller');
const route = require('express').Router();

route.get('/', Controller.getAllStations);
route.get('/:stationCode', Controller.getStationByCode);
route.post('/', Controller.createStation);
route.put('/:stationCode', Controller.updateStation);
route.delete('/:stationCode', Controller.deleteStation);

// route.get('/search', Controller.searchStations);
// route.get('/sort/:field/:order', Controller.sortStations);
// route.get('/filter/:field/:value', Controller.filterStations);

module.exports = route;
