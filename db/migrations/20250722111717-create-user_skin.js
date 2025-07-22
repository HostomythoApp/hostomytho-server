"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "user_skin",
      {
        user_id: {
          type: Sequelize.DataTypes.INTEGER,
          primaryKey: true,
          references: {
            model: "users",
            key: "id",
          },
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        },
        skin_id: {
          type: Sequelize.DataTypes.INTEGER,
          primaryKey: true,
          references: {
            model: "skins",
            key: "id",
          },
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        },
        equipped: {
          type: Sequelize.DataTypes.BOOLEAN,
          defaultValue: false,
        },
      },
      { collate: "utf8mb4_unicode_ci" }
    );
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable("user_skin");
  },
};
