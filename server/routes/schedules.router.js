const Controller = require('../controllers/schedules.controller');
const route = require('express').Router();

route.get('/', Controller.getAllSchedules);
route.get('/:id', Controller.getScheduleById);
route.post('/', Controller.createSchedule);
route.put('/:id', Controller.updateSchedule);
route.delete('/:id', Controller.deleteSchedule);

// Additional useful routes
route.get('/train/:trainNumber', Controller.getSchedulesByTrain);
route.get('/station/:stationCode', Controller.getSchedulesByStation);

module.exports = route;
