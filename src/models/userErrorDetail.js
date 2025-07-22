const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class UserErrorDetail extends Model {}

  UserErrorDetail.init(
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
      text_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "texts",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      word_positions: {
        type: DataTypes.TEXT("long"),
      },
      vote_weight: {
        type: DataTypes.INTEGER,
      },
      content: {
        type: DataTypes.TEXT("long"),
      },
      is_test: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      test_error_type_id: {
        type: DataTypes.INTEGER,
        defaultValue: false,
        references: {
          model: "error_types",
          key: "id",
        },
        onDelete: "SET NULL",
        onUpdate: "SET NULL",
      },
      reason_for_type: {
        type: DataTypes.TEXT("long"),
        defaultValue: "",
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "user_error_details",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: false,
    }
  );

  return UserErrorDetail;
};
