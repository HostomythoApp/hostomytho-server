"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.sequelize.query("ALTER TABLE group_text_rating COLLATE utf8mb4_unicode_ci;");
    await queryInterface.sequelize.query("ALTER TABLE variables COLLATE utf8mb4_unicode_ci;");
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.sequelize.query("ALTER TABLE group_text_rating COLLATE utf8mb4_general_ci;");
    await queryInterface.sequelize.query("ALTER TABLE variables COLLATE utf8mb4_general_ci;");
  },
};
