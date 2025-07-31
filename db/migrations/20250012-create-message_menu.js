"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "message_menu",
      {
        id: {
          type: Sequelize.DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        title: {
          type: Sequelize.DataTypes.STRING(255),
        },
        message: {
          type: Sequelize.DataTypes.TEXT("long"),
        },
        active: {
          type: Sequelize.DataTypes.TINYINT(4),
          defaultValue: false,
        },
        message_type: {
          type: Sequelize.DataTypes.ENUM,
          values: ["home_not_connected", "home_connected"],
        },
      },
      {
        collate: "utf8mb4_unicode_ci",
      }
    );
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable("message_menu");
  },
};
