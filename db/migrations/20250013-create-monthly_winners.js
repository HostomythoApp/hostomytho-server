"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "monthly_winners",
      {
        id: {
          type: Sequelize.DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        user_id: {
          type: Sequelize.DataTypes.INTEGER,
          references: {
            model: "users",
            key: "id",
          },
          onDelete: "SET NULL",
          onUpdate: "SET NULL",
        },
        username: {
          type: Sequelize.DataTypes.STRING(50),
        },
        points: {
          type: Sequelize.DataTypes.INTEGER,
        },
        ranking: {
          type: Sequelize.DataTypes.TINYINT(4),
        },
      },
      { collate: "utf8mb4_unicode_ci" }
    );
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable("monthly_winners");
  },
};
