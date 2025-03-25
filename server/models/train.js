'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Train extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Train.hasMany(models.TrainSchedule, { foreignKey: 'trainId', as: 'schedules' });
    }
  }
  Train.init(
    {
      trainNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'train number cannot be empty' },
          notEmpty: { msg: 'train number cannot be empty' },
        },
      },
      trainName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'train name cannot be empty' },
          notEmpty: { msg: 'train name cannot be empty' },
        },
      },
      from: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'train origin cannot be empty' },
          notEmpty: { msg: 'train origin cannot be empty' },
        },
      },
      to: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'train destination cannot be empty' },
          notEmpty: { msg: 'train destination cannot be empty' },
        },
      },
    },
    {
      sequelize,
      modelName: 'Train',
    }
  );
  return Train;
};
