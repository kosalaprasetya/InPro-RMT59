const toTitleCase = require('../helpers/titleCase');
const { Station, Train, TrainSchedule } = require('../models');

class StationsController {
  static async getAllStations(req, res, next) {
    try {
      const stations = await Station.findAll({
        include: [
          {
            model: TrainSchedule,
            as: 'schedules',
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
      res.status(200).json(stations);
    } catch (error) {
      next(error);
    }
  }

  static async getStationByCode(req, res, next) {
    try {
      const { stationCode: currentStationCode } = req.params;
      const upperCaseStationCode = currentStationCode.toUpperCase();
      const station = await Station.findOne({
        where: { stationCode: upperCaseStationCode },
        include: [
          {
            model: TrainSchedule,
            as: 'schedules',
            include: [
              {
                model: Train,
                as: 'train',
              },
            ],
          },
        ],
      });
      if (!station) throw { name: 'not found', message: 'Station not found' };
      res.status(200).json(station);
    } catch (error) {
      next(error);
    }
  }

  static async createStation(req, res, next) {
    try {
      const { stationName, stationCode, stationOperationalArea, stationRegion, stationClass } = req.body;

      const nStationName = toTitleCase(stationName);
      const nStationCode = stationCode.toUpperCase();
      const nOperationalArea = stationOperationalArea.toUpperCase();
      const nRegion = toTitleCase(stationRegion);
      const station = await Station.create({ stationName: nStationName, stationCode: nStationCode, stationOperationalArea: nOperationalArea, stationRegion: nRegion, stationClass });
      res.status(201).json(station);
    } catch (error) {
      next(error);
    }
  }

  static async updateStation(req, res, next) {
    try {
      const { stationCode: currentStationCode } = req.params;
      const { stationName, stationCode, stationOperationalArea, stationRegion, stationClass } = req.body;

      const upperCaseStationCode = currentStationCode.toUpperCase();

      const nStationName = toTitleCase(stationName);
      const nStationCode = stationCode.toUpperCase();
      const nOperationalArea = stationOperationalArea.toUpperCase();
      const nRegion = toTitleCase(stationRegion);

      const station = await Station.findOne({ where: { stationCode: upperCaseStationCode } });
      if (!station) throw { name: 'not found', message: 'Station not found' };

      await station.update({ stationName: nStationName, stationCode: nStationCode, stationOperationalArea: nOperationalArea, stationRegion: nRegion, stationClass });
      res.status(200).json({ message: 'Station updated successfully' });
    } catch (error) {
      next(error);
    }
  }

  static async deleteStation(req, res, next) {
    try {
      const { stationCode } = req.params;
      const upperCaseStationCode = stationCode.toUpperCase();
      const station = await Station.findOne({ where: { stationCode: upperCaseStationCode } });
      if (!station) throw { name: 'not found', message: 'Station not found' };
      await station.destroy();
      res.status(200).json({ message: 'Station deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = StationsController;
