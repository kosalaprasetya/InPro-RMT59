'use strict';

const { hasher } = require('../helpers/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const stationsData = require('../data/stations.json').map((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
      return el;
    });
    const trainsData = require('../data/trains.json').map((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
      return el;
    });
    const usersData = require('../data/users.json').map((el) => {
      el.password = hasher(el.password);
      el.createdAt = new Date();
      el.updatedAt = new Date();
      return el;
    });
    await queryInterface.bulkInsert('Stations', stationsData, {});
    await queryInterface.bulkInsert('Trains', trainsData, {});
    await queryInterface.bulkInsert('Users', usersData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Stations', null, {});
  },
};
