"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "group_text_rating",
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
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        },
        sentence_positions: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
        average_plausibility: {
          type: Sequelize.DataTypes.INTEGER,
        },
        votes_count: {
          type: Sequelize.DataTypes.INTEGER,
          defaultValue: 1,
        },
        created_at: {
          type: Sequelize.DataTypes.DATE,
          defaultValue: Sequelize.DataTypes.NOW,
        },
      },
      { collate: "utf8mb4_general_ci" }
    );
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable("group_text_rating");
  },
};
