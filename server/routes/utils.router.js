const Controller = require('../controllers/users.controller');
const route = require('express').Router();
const gemini = require('../helpers/geminiAI');
const weatherCondition = require('../helpers/weather');

route.post('/ai', async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ message: 'Message is required' });
  }
  const response = await gemini(message);
  res.status(200).send(response);
});

route.get('/weather/:region', async (req, res) => {
  const { region } = req.params; // Fixed to use req.params
  try {
    const weather = await weatherCondition(region);
    res.status(200).send(weather);
  } catch (error) {
    res.status(404).json({ message: error.message }); // Added error handling
  }
});

module.exports = route;
