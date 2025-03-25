const Controller = require('../controllers/controller');
const route = require('express').Router();

route.get('/', (req, res) => {
  res.send('/schedules');
});
route.get('/:id', (req, res) => {
  res.send('/schedules');
});
route.post('/', (req, res) => {
  res.send('/schedules');
});
route.put('/:id', (req, res) => {
  res.send('/schedules');
});
route.delete('/:id', (req, res) => {
  res.send('/schedules');
});
module.exports = route;
