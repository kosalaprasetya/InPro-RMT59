const Controller = require('../controllers/trains.controller');
const route = require('express').Router();

route.get('/', Controller.getAllTrains);
route.get('/:trainNumber', Controller.getTrainByNumber);
route.post('/', Controller.createTrain);
route.put('/:trainNumber', Controller.updateTrain);
route.delete('/:trainNumber', Controller.deleteTrain);

module.exports = route;
