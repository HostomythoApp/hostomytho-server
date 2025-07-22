const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class UserSentenceSpecification extends Model {}

  UserSentenceSpecification.init(
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
        allowNull: false,
        references: {
          model: "texts",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      type: {
        type: DataTypes.ENUM,
        values: ["hypothesis", "condition", "negation"],
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT("long"),
      },
      word_positions: {
        type: DataTypes.TEXT("long"),
        allowNull: false,
      },
      specification_weight: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "user_sentence_specification",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: false,
    }
  );

  return UserSentenceSpecification;
};
