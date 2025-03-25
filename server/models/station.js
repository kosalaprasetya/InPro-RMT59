'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Station extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Station.hasMany(models.TrainSchedule, { foreignKey: 'stationId', as: 'schedules' });
      Station.belongsToMany(models.Train, {
        through: models.TrainSchedule,
        foreignKey: 'stationId',
        otherKey: 'trainId',
        as: 'trains',
      });
    }
  }
  Station.init(
    {
      stationName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'station name cannot be empty' },
          notEmpty: { msg: 'station name cannot be empty' },
        },
      },
      stationCode: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: 'station code must be unique',
        },
        validate: {
          notNull: { msg: 'station code must be unique' },
          notEmpty: { msg: 'station code must be unique' },
        },
      },
      stationOperationalArea: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'station operational area cannot be empty' },
          notEmpty: { msg: 'station operational area cannot be empty' },
        },
      },
      stationRegion: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'station region cannot be empty' },
          notEmpty: { msg: 'station region cannot be empty' },
        },
      },
      stationClass: {
        type: DataTypes.INTEGER,
        defaultValue: 3,
      },
    },
    {
      sequelize,
      modelName: 'Station',
    }
  );
  return Station;
};
