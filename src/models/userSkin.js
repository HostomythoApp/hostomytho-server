const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class userSkin extends Model {}

  userSkin.init(
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
      skin_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "skins",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      equipped: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "user_skin",
      timestamps: false,
    }
  );

  return userSkin;
};
