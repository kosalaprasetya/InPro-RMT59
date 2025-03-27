const Controller = require('../controllers/controller');
const authentication = require('../middlewares/authentication');
const route = require('express').Router();

// Basic routes
route.get('/', Controller.home);
route.use('/auth', require('./users.router'));
route.use(authentication);
route.use('/users', require('./authUsers.router'));
route.use('/stations', require('./stations.router'));
route.use('/trains', require('./trains.router'));
route.use('/schedules', require('./schedules.router'));
route.use('/utils', require('./utils.router'));

module.exports = route;
