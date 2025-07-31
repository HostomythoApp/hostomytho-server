"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.renameColumn("users", "consecutiveDaysPlayed", "consecutive_days_played");
    await queryInterface.renameColumn("users", "lastPlayedDate", "last_played_date");
    await queryInterface.renameColumn("users", "coeffMulti", "coeff_multi");
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.renameColumn("users", "consecutive_days_played", "consecutiveDaysPlayed");
    await queryInterface.renameColumn("users", "last_played_date", "lastPlayedDate");
    await queryInterface.renameColumn("users", "coeff_multi", "coeffMulti");
  },
};
