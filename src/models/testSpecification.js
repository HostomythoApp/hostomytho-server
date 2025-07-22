const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class TestSpecification extends Model {}

  TestSpecification.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      text_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "texts",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      type: {
        type: DataTypes.ENUM,
        values: ["hypothesis", "condition", "negation"],
      },
      content: {
        type: DataTypes.TEXT("long"),
      },
      word_positions: {
        type: DataTypes.TEXT("long"),
      },
    },
    {
      sequelize,
      modelName: "test_specifications",
      timestamps: false,
    }
  );

  return TestSpecification;
};
