const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class UserPlayedErrors extends Model {}

  UserPlayedErrors.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "SET NULL",
        onUpdate: "SET NULL",
      },
      user_error_details_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "user_error_details",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
    },
    {
      sequelize,
      modelName: "user_played_errors",
      timestamps: false,
    }
  );

  return UserPlayedErrors;
};
