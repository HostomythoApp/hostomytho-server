"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "variables",
      {
        id: {
          type: Sequelize.DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        key: {
          type: Sequelize.DataTypes.STRING,
          unique: true,
          allowNull: false,
        },
        value: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
        },
        default_value: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
        },
        description: {
          type: Sequelize.DataTypes.TEXT("long"),
        },
      },
      { collate: "utf8mb4_general_ci" }
    );
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable("variables");
  },
};
