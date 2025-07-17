"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: Sequelize.DataTypes.STRING(50),
        unique: true,
        allowNull: false,
      },
      password: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: false,
      },
      status: {
        type: Sequelize.DataTypes.ENUM("inconnu", "medecin", "autre"),
        allowNull: false,
      },
      email: {
        type: Sequelize.DataTypes.STRING(255),
        defaultValue: "",
        allowNull: true,
        unique: true,
      },
      points: {
        type: Sequelize.DataTypes.INTEGER,
        defaultValue: 0,
      },
      monthly_points: {
        type: Sequelize.DataTypes.INTEGER,
        defaultValue: 0,
      },
      trust_index: {
        type: Sequelize.DataTypes.INTEGER,
        defaultValue: 50,
      },
      notifications_enabled: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: true,
      },
      gender: {
        type: Sequelize.DataTypes.ENUM("homme", "femme"),
        allowNull: false,
        defaultValue: "homme",
      },
      color_skin: {
        type: Sequelize.DataTypes.ENUM("clear", "medium", "dark"),
        allowNull: false,
      },
      moderator: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false,
      },
      catch_probability: {
        type: Sequelize.DataTypes.INTEGER,
        defaultValue: 0,
      },
      consecutiveDaysPlayed: {
        type: Sequelize.DataTypes.INTEGER,
        defaultValue: 0,
      },
      lastPlayedDate: {
        type: Sequelize.DataTypes.STRING(45),
      },
      created_at: {
        type: Sequelize.DataTypes.STRING(45),
      },
      coeffMulti: {
        type: Sequelize.DataTypes.DECIMAL(2, 1),
        defaultValue: 1.0,
      },
      nb_first_monthly: {
        type: Sequelize.DataTypes.INTEGER,
        defaultValue: 0,
      },
      tutorial_progress: {
        type: Sequelize.DataTypes.INTEGER,
        defaultValue: 0,
      },
      message_read: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
