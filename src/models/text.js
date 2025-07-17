const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Text extends Model {}
  Text.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      num: {
        type: DataTypes.STRING(45),
        allowNull: false,
        defaultValue: "",
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "",
      },
      origin: {
        type: DataTypes.ENUM("synthétique", "réel - vrai", "réel - faux"),
        defaultValue: "synthétique",
        allowNull: false,
      },
      is_plausibility_test: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      test_plausibility: {
        type: DataTypes.DECIMAL(5, 2),
        defaultValue: null,
      },
      reason_for_rate: {
        type: DataTypes.TEXT,
        defaultValue: null,
      },
      is_hypothesis_specification_test: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      is_condition_specification_test: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      is_negation_specification_test: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      nb_of_treatments: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      length: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "texts",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: false,
    }
  );
  return Text;
};
