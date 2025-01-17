const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Theme extends Model {}
  Theme.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "themes",
      timestamps: false,
    }
  );
  return Theme;
};
