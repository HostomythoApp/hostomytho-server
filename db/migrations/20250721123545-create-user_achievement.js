"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "user_achievement",
      {
        user_id: {
          type: Sequelize.DataTypes.INTEGER,
          primaryKey: true,
          references: {
            model: "users",
            key: "id",
          },
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        },
        achievement_id: {
          type: Sequelize.DataTypes.INTEGER,
          primaryKey: true,
          references: {
            model: "achievements",
            key: "id",
          },
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        },
        notified: {
          type: Sequelize.DataTypes.BOOLEAN,
          defaultValue: false,
        },
      },
      {
        collate: "utf8mb4_unicode_ci",
      }
    );
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable("user_achievement");
  },
};
