const UsersController = require('../controllers/users.controller');
const route = require('express').Router();

route.get('/all', UsersController.getAllUser);
route.get('/:id', UsersController.getUserById);
route.put('/:id/update', UsersController.editUser);
route.delete('/:id/delete', UsersController.deleteUser);

module.exports = route;
