"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "criminals",
      {
        id: {
          type: Sequelize.DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: Sequelize.DataTypes.STRING(50),
          allowNull: false,
        },
        imageId: {
          type: Sequelize.DataTypes.STRING(50),
          allowNull: false,
        },
        description: {
          type: Sequelize.DataTypes.TEXT("long"),
        },
        descriptionArrest: {
          type: Sequelize.DataTypes.TEXT("long"),
        },
      },
      {
        collate: "utf8mb4_unicode_ci",
      }
    );
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable("criminals");
  },
};
