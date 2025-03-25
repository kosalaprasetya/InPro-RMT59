const res = require('express/lib/response');
const Controller = require('../controllers/controller');
const route = require('express').Router();

route.get('/schedules', (req, res) => {
  res.send('/schedules');
});
route.get('/schedules/:id', (req, res) => {
  res.send('/schedules');
});
route.post('/schedules', (req, res) => {
  res.send('/schedules');
});
route.put('/schedules/:id', (req, res) => {
  res.send('/schedules');
});
route.delete('/schedules/:id', (req, res) => {
  res.send('/schedules');
});

module.exports = route;
