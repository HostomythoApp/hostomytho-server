'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('user_text_rating',
      {
        id: {
          type: Sequelize.DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        user_id: {
          type: Sequelize.DataTypes.INTEGER,
          references: {
            model: "users",
            key: "id",
          },
        },
        text_id: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "texts",
            key: "id",
          },
        },
        plausibility: {
          type: Sequelize.DataTypes.DECIMAL(5,2),
          allowNull: false,
        },
        sentence_positions: {
          type: Sequelize.DataTypes.STRING,
        },
        vote_weight: {
          type: Sequelize.DataTypes.INTEGER,
        },
        group_id: {
          type: Sequelize.DataTypes.INTEGER,
          references: {
            model: "group_text_rating",
            key: "id",
          },
        },
        created_at: {
          type: Sequelize.DataTypes.TIME
        }
      },
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('user_text_rating');
  }
};
