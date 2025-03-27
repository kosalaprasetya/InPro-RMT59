const UsersController = require('../controllers/users.controller');
const route = require('express').Router();

route.post('/register', UsersController.register);
route.post('/login', UsersController.login);
route.post('/googlelogin', UsersController.googleLogin);

module.exports = route;
