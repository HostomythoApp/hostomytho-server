const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Variable extends Model {}
  Variable.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      key: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      value: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      default_value: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT("long"),
      },
    },
    {
      sequelize,
      modelName: "variables",
      timestamps: false,
    }
  );
  return Variable;
};
