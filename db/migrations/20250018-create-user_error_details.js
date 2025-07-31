"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "user_error_details",
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
        text_id: {
          type: Sequelize.DataTypes.INTEGER,
          references: {
            model: "texts",
            key: "id",
          },
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        },
        word_positions: {
          type: Sequelize.DataTypes.TEXT("long"),
        },
        vote_weight: {
          type: Sequelize.DataTypes.INTEGER,
        },
        content: {
          type: Sequelize.DataTypes.TEXT("long"),
        },
        is_test: {
          type: Sequelize.DataTypes.BOOLEAN,
          defaultValue: false,
        },
        test_error_type_id: {
          type: Sequelize.DataTypes.INTEGER,
          defaultValue: false,
          references: {
            model: "error_types",
            key: "id",
          },
          onDelete: "SET NULL",
          onUpdate: "SET NULL",
        },
        reason_for_type: {
          type: Sequelize.DataTypes.TEXT("long"),
          defaultValue: "",
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
    await queryInterface.dropTable("user_error_details");
  },
};
