const Controller = require('../controllers/users.controller');
const route = require('express').Router();
const gemini = require('../helpers/geminiAI');
const weatherCondition = require('../helpers/weather');

route.get('/ai', async (req, res) => {
  const { message } = req.body;
  const response = await gemini(message);
  res.status(200).send(response);
});

route.get('/weather/:region', async (req, res) => {
  const { region } = req.body;
  const weather = await weatherCondition(region);
  res.status(200).send(weather);
});

module.exports = route;
