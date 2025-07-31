"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "skins",
      {
        id: {
          type: Sequelize.DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: Sequelize.DataTypes.STRING(50),
          allowNull: false,
        },
        type: {
          type: Sequelize.DataTypes.ENUM,
          values: ["Vestes", "Chapeaux", "Lunettes", "Cheveux", "Visages", "Accessoires"],
          allowNull: false,
        },
        gender: {
          type: Sequelize.DataTypes.ENUM,
          values: ["homme", "femme", "unisexe"],
          allowNull: false,
        },
        rarity: {
          type: Sequelize.DataTypes.INTEGER,
        },
        image_url: {
          type: Sequelize.DataTypes.STRING(255),
        },
      },
      { collate: "utf8mb4_unicode_ci" }
    );
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable("skins");
  },
};
