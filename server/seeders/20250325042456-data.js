'use strict';

const { hasher } = require('../helpers/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const stationsData = require('../data/stations.json').map((el) => {
      delete el.id;
      el.createdAt = new Date();
      el.updatedAt = new Date();
      return el;
    });
    const trainsData = require('../data/trains.json').map((el) => {
      delete el.id;
      el.createdAt = new Date();
      el.updatedAt = new Date();
      return el;
    });
    const usersData = require('../data/users.json').map((el) => {
      delete el.id;
      el.password = hasher(el.password);
      el.createdAt = new Date();
      el.updatedAt = new Date();
      return el;
    });
    const schedulesData = require('../data/schedules.json').map((el) => {
      delete el.id;
      el.createdAt = new Date();
      el.updatedAt = new Date();
      return el;
    });

    try {
      await queryInterface.bulkInsert('Stations', stationsData, {});
      await queryInterface.bulkInsert('Trains', trainsData, {});
      await queryInterface.bulkInsert('Users', usersData, {});
      await queryInterface.bulkInsert('TrainSchedules', schedulesData, {});
    } catch (error) {
      console.error('Error during seeding:', error);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Stations', null, {});
    await queryInterface.bulkDelete('Trains', null, {});
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('TrainSchedules', null, {});
  },
};
