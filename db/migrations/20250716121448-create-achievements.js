"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("achievements", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      description: {
        type: Sequelize.DataTypes.STRING(255),
        defaultValue: null,
      },
      picto: {
        type: Sequelize.DataTypes.STRING(45),
        defaultValue: null,
      },
      color: {
        type: Sequelize.DataTypes.STRING(45),
        defaultValue: null,
      },
      lib: {
        type: Sequelize.DataTypes.STRING(45),
        defaultValue: null,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("achievements");
  },
};
