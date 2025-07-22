"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "test_specifications",
      {
        id: {
          type: Sequelize.DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        text_id: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "texts",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        type: {
          type: Sequelize.DataTypes.ENUM,
          values: ["hypothesis", "condition", "negation"],
        },
        content: {
          type: Sequelize.DataTypes.TEXT("long"),
        },
        word_positions: {
          type: Sequelize.DataTypes.TEXT("long"),
        },
      },
      { collate: "utf8mb4_unicode_ci" }
    );
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable("test_specifications");
  },
};
