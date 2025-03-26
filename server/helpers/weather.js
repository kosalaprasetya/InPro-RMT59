if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const weatherApiKey = process.env.WEATHER_API_KEY;
const weatherUrl = `http://api.weatherapi.com/v1/`;

const weatherCondition = async (region = 'Jakarta') => {
  const endpoint = `${weatherUrl}current.json?key=${weatherApiKey}&q=${region}&aqi=no`;
  const response = await fetch(endpoint);
  const result = await response.json();
  return result;
};

module.exports = weatherCondition;
