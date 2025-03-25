'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TrainSchedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TrainSchedule.belongsTo(models.Train, { foreignKey: 'trainId', as: 'train' });
      TrainSchedule.belongsTo(models.Station, { foreignKey: 'stationId', as: 'station' });
    }
  }
  TrainSchedule.init(
    {
      arrival: {
        type: DataTypes.TIME,
        allowNull: false,
        validate: {
          notNull: { msg: 'Arrival time cannot be empty' },
          notEmpty: { msg: 'Arrival time cannot be empty' },
        },
      },
      departure: {
        type: DataTypes.TIME,
        allowNull: false,
        validate: {
          notNull: { msg: 'Departure time cannot be empty' },
          notEmpty: { msg: 'Departure time cannot be empty' },
        },
      },
      isPassingOnly: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      isTerminus: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      stationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: 'Station ID cannot be empty' },
          isInt: { msg: 'Station ID must be number' },
        },
      },
      trainId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: 'Train ID cannot be empty' },
          isInt: { msg: 'Train ID must be number' },
        },
      },
    },
    {
      sequelize,
      modelName: 'TrainSchedule',
    }
  );
  return TrainSchedule;
};
