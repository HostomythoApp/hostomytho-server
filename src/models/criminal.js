const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Criminal extends Model {}

  Criminal.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      imageId: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT("long"),
      },
      descriptionArrest: {
        type: DataTypes.TEXT("long"),
      },
    },
    {
      sequelize,
      modelName: "criminals",
      timestamps: false,
    }
  );

  return Criminal;
};
