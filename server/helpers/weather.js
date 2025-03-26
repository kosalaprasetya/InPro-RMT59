if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const weatherApiKey = process.env.WEATHER_API_KEY;
const weatherUrl = `http://api.weatherapi.com/v1/`;

const weatherCondition = async (region = 'Jakarta') => {
  try {
    const endpoint = `${weatherUrl}current.json?key=${weatherApiKey}&q=${region}&aqi=no`;
    const response = await fetch(endpoint);
    if (!response.ok) throw new Error('Failed to fetch weather data');
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Weather API Error:', error);
    throw new Error('Unable to retrieve weather data');
  }
};

module.exports = weatherCondition;
