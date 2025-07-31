"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "games",
      {
        id: {
          type: Sequelize.DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: Sequelize.DataTypes.STRING(45),
        },
      },
      { collate: "utf8mb4_unicode_ci" }
    );
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable("games");
  },
};
