const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class UserTypingErrors extends Model {}

  UserTypingErrors.init(
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
      error_type_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "error_types",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      weight: {
        type: DataTypes.INTEGER,
        defaultValue: 50,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "user_typing_errors",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: false,
    }
  );

  return UserTypingErrors;
};
