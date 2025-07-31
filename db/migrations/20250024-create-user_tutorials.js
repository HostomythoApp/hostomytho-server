"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "user_tutorials",
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
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        },
        game_id: {
          type: Sequelize.DataTypes.INTEGER,
          references: {
            model: "games",
            key: "id",
          },
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        },
        completed: {
          type: Sequelize.DataTypes.TINYINT(4),
          defaultValue: false,
        },
      },
      { collate: "utf8mb4_unicode_ci" }
    );
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable("user_tutorials");
  },
};
