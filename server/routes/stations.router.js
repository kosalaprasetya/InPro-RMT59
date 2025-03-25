const Controller = require('../controllers/controller');
const route = require('express').Router();

route.get('/stations', (req, res) => {
  res.send('/schedules');
});
route.get('/stations/:id', (req, res) => {
  res.send('/schedules');
});
route.post('/stations', (req, res) => {
  res.send('/schedules');
});
route.put('/stations/:id', (req, res) => {
  res.send('/schedules');
});
route.delete('/stations/:id', (req, res) => {
  res.send('/schedules');
});

module.exports = route;
