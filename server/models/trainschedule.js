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
        allowNull: true,
      },
      departure: {
        type: DataTypes.TIME,
        allowNull: true,
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
