const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    static associate(models) {
      this.belongsTo(models.Text, { foreignKey: "text_id" });
    }
  }
  Token.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      text_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "texts",
          key: "id",
        },
      },
      content: {
        type: DataTypes.STRING(45),
      },
      position: {
        type: DataTypes.INTEGER,
      },
      is_punctuation: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      sentence_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "sentences",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "tokens",
      timestamps: false,
    }
  );
  return Token;
};
