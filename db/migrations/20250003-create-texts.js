"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "texts",
      {
        id: {
          type: Sequelize.DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        num: {
          type: Sequelize.DataTypes.STRING(255),
          allowNull: false,
        },
        content: {
          type: Sequelize.DataTypes.TEXT("long"),
          allowNull: false,
          defaultValue: "",
        },
        origin: {
          type: Sequelize.DataTypes.ENUM("synthétique", "réel - vrai", "réel - faux"),
          defaultValue: "synthétique",
          allowNull: false,
        },
        is_plausibility_test: {
          type: Sequelize.DataTypes.TINYINT(4),
          defaultValue: false,
        },
        test_plausibility: {
          type: Sequelize.DataTypes.DECIMAL(5, 2),
          defaultValue: null,
        },
        reason_for_rate: {
          type: Sequelize.DataTypes.TEXT("long"),
          defaultValue: null,
        },
        is_hypothesis_specification_test: {
          type: Sequelize.DataTypes.TINYINT(4),
          defaultValue: false,
        },
        is_condition_specification_test: {
          type: Sequelize.DataTypes.TINYINT(4),
          defaultValue: false,
        },
        is_negation_specification_test: {
          type: Sequelize.DataTypes.TINYINT(4),
          defaultValue: false,
        },
        nb_of_treatments: {
          type: Sequelize.DataTypes.INTEGER,
          defaultValue: 0,
        },
        is_active: {
          type: Sequelize.DataTypes.TINYINT(4),
          defaultValue: true,
        },
        length: {
          type: Sequelize.DataTypes.INTEGER,
          defaultValue: 0,
        },
        created_at: {
          type: Sequelize.DataTypes.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
      },
      { collate: "utf8mb4_unicode_ci" }
    );
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable("texts");
  },
};
