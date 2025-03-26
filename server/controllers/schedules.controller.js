const { TrainSchedule, Train, Station } = require('../models');

class SchedulesController {
  static async getAllSchedules(req, res, next) {
    try {
      const schedules = await TrainSchedule.findAll({
        include: [
          { model: Train, as: 'train' },
          { model: Station, as: 'station' },
        ],
        order: [
          ['trainId', 'ASC'],
          ['arrival', 'ASC'],
        ],
      });
      res.status(200).json(schedules);
    } catch (error) {
      next(error);
    }
  }

  static async getScheduleById(req, res, next) {
    try {
      const { id } = req.params;
      const schedule = await TrainSchedule.findOne({
        where: { id },
        include: [
          { model: Train, as: 'train' },
          { model: Station, as: 'station' },
        ],
      });

      if (!schedule) throw { name: 'not found', message: 'Schedule not found' };

      res.status(200).json(schedule);
    } catch (error) {
      next(error);
    }
  }

  static async createSchedule(req, res, next) {
    try {
      const { arrival, departure, isPassingOnly, isTerminus, stationId, trainId } = req.body;

      if (!arrival || !departure || !stationId || !trainId) {
        throw { name: 'bad request', message: 'Missing required fields' };
      }

      // Validate if train and station exist
      const train = await Train.findByPk(trainId);
      if (!train) throw { name: 'not found', message: 'Train not found' };

      const station = await Station.findByPk(stationId);
      if (!station) throw { name: 'not found', message: 'Station not found' };

      const schedule = await TrainSchedule.create({
        arrival,
        departure,
        isPassingOnly: isPassingOnly || false,
        isTerminus: isTerminus || false,
        stationId,
        trainId,
      });

      res.status(201).json({ schedule, station, train });
    } catch (error) {
      next(error);
    }
  }

  static async updateSchedule(req, res, next) {
    try {
      const { id } = req.params;
      const { arrival, departure, isPassingOnly, isTerminus, stationId, trainId } = req.body;

      // Check if schedule exists
      const schedule = await TrainSchedule.findOne({ where: { id } });
      if (!schedule) throw { name: 'not found', message: 'Schedule not found' };

      // Validate if train and station exist if they're being updated
      if (trainId) {
        const train = await Train.findByPk(trainId);
        if (!train) throw { name: 'not found', message: 'Train not found' };
      }

      if (stationId) {
        const station = await Station.findByPk(stationId);
        if (!station) throw { name: 'not found', message: 'Station not found' };
      }

      await TrainSchedule.update(
        {
          arrival,
          departure,
          isPassingOnly,
          isTerminus,
          stationId,
          trainId,
        },
        { where: { id } }
      );

      res.status(200).json({ message: 'Schedule updated successfully' });
    } catch (error) {
      next(error);
    }
  }

  static async deleteSchedule(req, res, next) {
    try {
      const { id } = req.params;

      // Check if schedule exists
      const schedule = await TrainSchedule.findOne({ where: { id } });
      if (!schedule) throw { name: 'not found', message: 'Schedule not found' };

      await TrainSchedule.destroy({ where: { id } });

      res.status(200).json({ message: 'Schedule deleted successfully' });
    } catch (error) {
      next(error);
    }
  }

  static async getSchedulesByTrain(req, res, next) {
    try {
      const { trainNumber } = req.params;
      // Check if train exists
      const train = await Train.findOne({ where: { trainNumber: trainNumber.toUpperCase() } });
      if (!train) throw { name: 'not found', message: 'Train not found' };

      const schedules = await TrainSchedule.findAll({
        where: { trainId: train.id },
        include: [
          { model: Train, as: 'train' },
          { model: Station, as: 'station' },
        ],
        order: [['arrival', 'ASC']],
      });

      res.status(200).json(schedules);
    } catch (error) {
      next(error);
    }
  }

  static async getSchedulesByStation(req, res, next) {
    try {
      const { stationCode } = req.params;

      // Check if station exists
      const station = await Station.findOne({ where: { stationCode: stationCode.toUpperCase() } });
      if (!station) throw { name: 'not found', message: 'Station not found' };

      const schedules = await TrainSchedule.findAll({
        where: { stationId: station.id },
        include: [
          { model: Train, as: 'train' },
          { model: Station, as: 'station' },
        ],
        order: [['arrival', 'ASC']],
      });

      res.status(200).json(schedules);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = SchedulesController;
