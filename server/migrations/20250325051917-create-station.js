'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Stations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      stationName: {
        type: Sequelize.STRING,
        allowNull: false, // station name cannot be empty
      },
      stationCode: {
        type: Sequelize.STRING,
        allowNull: false, // station code cannot be empty
        unique: true, // station code must be unique
      },
      stationOperationalArea: {
        type: Sequelize.STRING,
        allowNull: false, // station operational area cannot be empty
      },
      stationRegion: {
        type: Sequelize.STRING,
        allowNull: false, // station region cannot be empty
      },
      stationClass: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 3,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Stations');
  },
};
