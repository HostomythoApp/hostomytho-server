const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class UserTextRating extends Model {}

  UserTextRating.init(
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
      },
      text_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "texts",
          key: "id",
        },
      },
      plausibility: {
        type: DataTypes.DECIMAL(5,2),
        allowNull: false,
      },
      sentence_positions: {
        type: DataTypes.STRING,
      },
      vote_weight: {
        type: DataTypes.INTEGER,
      },
      group_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "group_text_rating",
          key: "id",
        },
      },
      created_at: {
        type: DataTypes.TIME
      }
    },
    {
      sequelize,
      modelName: "user_text_rating",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: false,
    }
  );

  return UserTextRating;
};
