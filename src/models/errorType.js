const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ErrorType extends Model {}

  ErrorType.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "error_types",
      timestamps: false,
    }
  );

  return ErrorType;
};
