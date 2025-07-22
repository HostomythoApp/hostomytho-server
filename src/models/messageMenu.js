const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class MessageMenu extends Model {}
  MessageMenu.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING(255),
      },
      message: {
        type: DataTypes.TEXT("long"),
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      message_type: {
        type: DataTypes.ENUM,
        values: ["home_not_connected", "home_connected"],
      },
    },
    {
      sequelize,
      modelName: "message_menu",
      timestamps: false,
    }
  );
  return MessageMenu;
};
