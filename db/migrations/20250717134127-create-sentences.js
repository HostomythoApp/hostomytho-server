"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("sentences", {
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
      },
      content: {
        type: Sequelize.DataTypes.TEXT,
      },
      position: {
        type: Sequelize.DataTypes.INTEGER,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("sentences");
  },
};
