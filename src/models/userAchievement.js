const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class UserAchievement extends Model {}

  UserAchievement.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      achievement_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "achievements",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      notified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "user_achievement",
      timestamps: false,
    }
  );

  return UserAchievement;
};
