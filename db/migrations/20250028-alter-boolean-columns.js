"use strict";

/**
 * While this migration may not be needed on a fully clean install,
 * it is necessary to make sure all "boolean" columns on the production db
 * follow the same schema (bool=tinyint(1))
 */

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("message_menu", "active", {
      type: Sequelize.DataTypes.BOOLEAN,
      defaultValue: false,
    });
    await queryInterface.changeColumn("user_achievement", "notified", {
      type: Sequelize.DataTypes.BOOLEAN,
      defaultValue: false,
    });
    await queryInterface.changeColumn("user_skin", "equipped", {
      type: Sequelize.DataTypes.BOOLEAN,
      defaultValue: false,
    });
    await queryInterface.changeColumn("user_tutorials", "completed", {
      type: Sequelize.DataTypes.BOOLEAN,
      defaultValue: false,
    });
    await queryInterface.changeColumn("tokens", "is_punctuation", {
      type: Sequelize.DataTypes.BOOLEAN,
    });
    await queryInterface.changeColumn("tokens", "is_punctuation", {
      type: Sequelize.DataTypes.BOOLEAN,
    });
    await queryInterface.changeColumn("texts", "is_plausibility_test", {
      type: Sequelize.DataTypes.BOOLEAN,
    });
    await queryInterface.changeColumn("texts", "is_hypothesis_specification_test", {
      type: Sequelize.DataTypes.BOOLEAN,
    });
    await queryInterface.changeColumn("texts", "is_condition_specification_test", {
      type: Sequelize.DataTypes.BOOLEAN,
    });
    await queryInterface.changeColumn("texts", "is_negation_specification_test", {
      type: Sequelize.DataTypes.BOOLEAN,
    });
    await queryInterface.changeColumn("texts", "is_active", {
      type: Sequelize.DataTypes.BOOLEAN,
    });
    await queryInterface.changeColumn("users", "moderator", {
      type: Sequelize.DataTypes.BOOLEAN,
    });
    await queryInterface.changeColumn("users", "message_read", {
      type: Sequelize.DataTypes.BOOLEAN,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("message_menu", "active", {
      type: Sequelize.DataTypes.TINYINT(4),
      defaultValue: null,
    });
    await queryInterface.changeColumn("user_achievement", "notified", {
      type: Sequelize.DataTypes.TINYINT(4),
      defaultValue: null,
    });
    await queryInterface.changeColumn("user_skin", "equipped", {
      type: Sequelize.DataTypes.TINYINT(4),
      defaultValue: null,
    });
    await queryInterface.changeColumn("user_tutorials", "completed", {
      type: Sequelize.DataTypes.TINYINT(4),
      defaultValue: null,
    });
    await queryInterface.changeColumn("tokens", "is_punctuation", {
      type: Sequelize.DataTypes.TINYINT(4),
    });
    await queryInterface.changeColumn("texts", "is_plausibility_test", {
      type: Sequelize.DataTypes.TINYINT(4),
    });
    await queryInterface.changeColumn("texts", "is_hypothesis_specification_test", {
      type: Sequelize.DataTypes.TINYINT(4),
    });
    await queryInterface.changeColumn("texts", "is_condition_specification_test", {
      type: Sequelize.DataTypes.TINYINT(4),
    });
    await queryInterface.changeColumn("texts", "is_negation_specification_test", {
      type: Sequelize.DataTypes.TINYINT(4),
    });
    await queryInterface.changeColumn("texts", "is_active", {
      type: Sequelize.DataTypes.TINYINT(4),
    });
    await queryInterface.changeColumn("users", "moderator", {
      type: Sequelize.DataTypes.TINYINT(4),
    });
    await queryInterface.changeColumn("users", "message_read", {
      type: Sequelize.DataTypes.TINYINT(4),
    });
  },
};
