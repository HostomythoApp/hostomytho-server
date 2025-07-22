const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class UserGameText extends Model {}

  UserGameText.init(
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
      text_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "texts",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      game_type: {
        type: DataTypes.ENUM,
        values: ["hypothesis", "condition", "negation", "plausibility", "link_entity"],
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "user_game_texts",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: false,
    }
  );

  return UserGameText;
};
