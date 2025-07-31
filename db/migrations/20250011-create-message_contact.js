"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "message_contact",
      {
        id: {
          type: Sequelize.DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        user_id: {
          type: Sequelize.DataTypes.INTEGER,
          references: {
            model: "users",
            key: "id",
          },
          onDelete: "SET NULL",
          onUpdate: "CASCADE",
        },
        username: {
          type: Sequelize.DataTypes.STRING(255),
        },
        email: {
          type: Sequelize.DataTypes.STRING(255),
        },
        subject: {
          type: Sequelize.DataTypes.STRING(255),
          allowNull: false,
        },
        message: {
          type: Sequelize.DataTypes.TEXT,
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DataTypes.DATE,
          defaultValue: Sequelize.DataTypes.NOW,
        },
      },
      {
        collate: "utf8mb4_unicode_ci",
      }
    );
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable("message_contact");
  },
};
