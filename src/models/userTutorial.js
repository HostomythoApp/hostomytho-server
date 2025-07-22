const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class UserTutorial extends Model {}

  UserTutorial.init(
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
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      game_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "games",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "user_tutorials",
      timestamps: false,
    }
  );

  return UserTutorial;
};
