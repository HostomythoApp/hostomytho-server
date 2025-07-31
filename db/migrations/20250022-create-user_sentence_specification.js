"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable(
      "user_sentence_specification",
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
          allowNull: false,
          references: {
            model: "texts",
            key: "id",
          },
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        },
        type: {
          type: Sequelize.DataTypes.ENUM,
          values: ["hypothesis", "condition", "negation"],
          allowNull: false,
        },
        content: {
          type: Sequelize.DataTypes.TEXT("long"),
        },
        word_positions: {
          type: Sequelize.DataTypes.TEXT("long"),
          allowNull: false,
        },
        specification_weight: {
          type: Sequelize.DataTypes.INTEGER,
          defaultValue: 0,
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
    await queryInterface.dropTable("user_sentence_specification");
  },
};
