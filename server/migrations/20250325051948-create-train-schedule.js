'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TrainSchedules', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      arrival: {
        type: Sequelize.TIME,
        allowNull: false, // Arrival time cannot be empty
      },
      departure: {
        type: Sequelize.TIME,
        allowNull: false, // Departure time cannot be empty
      },
      isPassingOnly: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      isTerminus: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      stationId: {
        type: Sequelize.INTEGER,
        allowNull: false, // Station ID cannot be empty
        references: {
          model: 'Stations',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      trainId: {
        type: Sequelize.INTEGER,
        allowNull: false, // Train ID cannot be empty
        references: {
          model: 'Trains',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
    await queryInterface.dropTable('TrainSchedules');
  },
};
