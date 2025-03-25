'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Trains', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      trainNumber: {
        type: Sequelize.STRING,
        allowNull: false, // train number cannot be empty
      },
      trainName: {
        type: Sequelize.STRING,
        allowNull: false, // train name cannot be empty
      },
      from: {
        type: Sequelize.STRING,
        allowNull: false, // train origin cannot be empty
      },
      to: {
        type: Sequelize.STRING,
        allowNull: false, // train destination cannot be empty
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
    await queryInterface.dropTable('Trains');
  },
};
