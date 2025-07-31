"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "error_types",
      {
        id: {
          type: Sequelize.DataTypes.INTEGER,
          primaryKey: true,
        },
        name: {
          type: Sequelize.DataTypes.STRING(45),
          allowNull: false,
        },
        description: {
          type: Sequelize.DataTypes.STRING,
        },
      },
      {
        collate: "utf8mb4_unicode_ci",
      }
    );
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable("error_types");
  },
};
