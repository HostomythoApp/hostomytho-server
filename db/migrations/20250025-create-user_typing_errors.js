"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "user_typing_errors",
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
        user_error_details_id: {
          type: Sequelize.DataTypes.INTEGER,
          references: {
            model: "user_error_details",
            key: "id",
          },
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        },
        error_type_id: {
          type: Sequelize.DataTypes.INTEGER,
          references: {
            model: "error_types",
            key: "id",
          },
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        },
        weight: {
          type: Sequelize.DataTypes.INTEGER,
          defaultValue: 50,
        },
        created_at: {
          type: Sequelize.DataTypes.DATE,
          defaultValue: Sequelize.DataTypes.NOW,
        },
      },
      { collate: "utf8mb4_unicode_ci" }
    );
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable("user_typing_errors");
  },
};
