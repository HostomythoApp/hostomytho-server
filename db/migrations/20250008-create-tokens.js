"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "tokens",
      {
        id: {
          type: Sequelize.DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
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
        content: {
          type: Sequelize.DataTypes.STRING(45),
        },
        position: {
          type: Sequelize.DataTypes.INTEGER,
        },
        is_punctuation: {
          type: Sequelize.DataTypes.TINYINT(4),
          defaultValue: false,
        },
        sentence_id: {
          type: Sequelize.DataTypes.INTEGER,
          references: {
            model: "sentences",
            key: "id",
          },
          onDelete: "SET NULL",
          onUpdate: "SET NULL",
        },
      },
      { collate: "utf8mb4_unicode_ci" }
    );
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable("tokens");
  },
};
