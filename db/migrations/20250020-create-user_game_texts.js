"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "user_game_texts",
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
        text_id: {
          type: Sequelize.DataTypes.INTEGER,
          primaryKey: true,
          references: {
            model: "texts",
            key: "id",
          },
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        },
        game_type: {
          type: Sequelize.DataTypes.ENUM,
          values: ["hypothesis", "condition", "negation", "plausibility", "link_entity"],
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DataTypes.DATE,
          defaultValue: Sequelize.DataTypes.NOW,
        },
      },
      { collate: "utf8mb4_unicode_ci" }
    );
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable("user_game_texts");
  },
};
