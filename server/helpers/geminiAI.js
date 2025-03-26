if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const { Train, TrainSchedule, Station } = require('../models');
const { GoogleGenAI } = require('@google/genai');
const weatherCondition = require('./weather');
const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: `${apiKey}` });

const gemini = async (string) => {
  const trains = await Train.findAll({
    attributes: ['trainName', 'trainNumber', 'from', 'to'],
    include: [
      {
        model: TrainSchedule,
        as: 'schedules',
        attributes: ['id', 'departure', 'arrival', 'stationId'],
        include: [
          {
            model: Station,
            as: 'station',
            attributes: ['id', 'stationName', 'stationOperationalArea', 'stationCode', 'stationRegion'],
          },
        ],
      },
    ],
  });
  const stations = await Station.findAll({
    attributes: ['id', 'stationName', 'stationOperationalArea', 'stationCode', 'stationRegion'],
    include: [
      {
        model: TrainSchedule,
        as: 'schedules',
        attributes: ['id', 'departure', 'arrival', 'trainId'],
        include: [
          {
            model: Train,
            as: 'train',
          },
        ],
      },
    ],
    order: [['stationOperationalArea', 'ASC']],
  });
  const parsedTrains = JSON.stringify(trains, null, 2);
  const parsedStations = JSON.stringify(stations, null, 2);
  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: `
      Here is the context of your chat as follows:
      trains data: ${parsedTrains},
      and stations data: ${parsedStations}.
      Here is the user input:${string}.
      
      You're supposed to give an answer or explanation from the user's question based on the context above. Do not accept any conversation beside train schedule and weather information provide by user input which is data called from API.
      If the users ask about train schedule, give the answer based on the train schedule data. If the users ask about the weather, give the answer based on the weather data.
      
      If the users ask about anything else, give the answer based on the context above or just give a random fact or data about trains, schedules, and stations, do not ask anything just give the answer, for example: "*give some statement here* I dont know about that, but i know about trains *give some nice words here* (show some trains fact)".
      `,
  });

  return response.text;
};

module.exports = gemini;
