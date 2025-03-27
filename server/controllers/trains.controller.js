const toTitleCase = require('../helpers/titleCase');
const { Train, TrainSchedule, Station } = require('../models');

class TrainsController {
  static async getAllTrains(req, res, next) {
    try {
      const trains = await Train.findAll({
        include: [
          {
            model: TrainSchedule,
            as: 'schedules',
            include: [
              {
                model: Station,
                as: 'station',
              },
            ],
          },
        ],
      });
      res.status(200).json(trains);
    } catch (error) {
      next(error);
    }
  }

  static async getTrainByNumber(req, res, next) {
    try {
      const { trainNumber } = req.params;
      const train = await Train.findOne({
        where: { trainNumber: trainNumber.toUpperCase() },
        include: [
          {
            model: TrainSchedule,
            as: 'schedules',
            include: [
              {
                model: Station,
                as: 'station',
              },
            ],
          },
        ],
      });
      if (!train) throw { name: 'not found', message: 'Train not found' };
      res.status(200).json(train);
    } catch (error) {
      next(error);
    }
  }

  static async createTrain(req, res, next) {
    try {
      const { trainNumber, trainName, from, to } = req.body;
      const ntrainName = toTitleCase(trainName);
      const ntrainNumber = trainNumber.toUpperCase();
      const nfrom = from.toUpperCase();
      const nto = to.toUpperCase();
      const train = await Train.create({ trainName: ntrainName, trainNumber: ntrainNumber, from: nfrom, to: nto });
      res.status(201).json(train);
    } catch (error) {
      next(error);
    }
  }

  static async updateTrain(req, res, next) {
    try {
      const { trainNumber: curTrainNumber } = req.params;
      const { trainName, trainNumber, from, to } = req.body;

      const currentTrainNumber = curTrainNumber.toUpperCase();

      const ntrainName = toTitleCase(trainName);
      const ntrainNumber = trainNumber.toUpperCase();
      const nfrom = from.toUpperCase();
      const nto = to.toUpperCase();

      const train = await Train.findOne({ where: { trainNumber: currentTrainNumber } });
      if (!train) throw { name: 'not found', message: 'Train not found' };

      await train.update({ trainName: ntrainName, trainNumber: ntrainNumber, from: nfrom, to: nto });
      res.status(200).json({ message: 'Train updated successfully' });
    } catch (error) {
      next(error);
    }
  }

  static async deleteTrain(req, res, next) {
    try {
      const { trainNumber: curTrainNumber } = req.params;

      const currentTrainNumber = curTrainNumber.toUpperCase();

      const train = await Train.findOne({ where: { trainNumber: currentTrainNumber } });
      if (!train) throw { name: 'not found', message: 'Train not found' };
      await train.destroy();
      res.status(200).json({ message: 'Train deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = TrainsController;
