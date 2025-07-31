"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "sentences",
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
          type: Sequelize.DataTypes.TEXT,
        },
        position: {
          type: Sequelize.DataTypes.INTEGER,
        },
      },
      { collate: "utf8mb4_unicode_ci" }
    );
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable("sentences");
  },
};
