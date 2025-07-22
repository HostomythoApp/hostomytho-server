const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Skin extends Model {}

  Skin.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM,
        values: ["Vestes", "Chapeaux", "Lunettes", "Cheveux", "Visages", "Accessoires"],
        allowNull: false,
      },
      gender: {
        type: DataTypes.ENUM,
        values: ["homme", "femme", "unisexe"],
        allowNull: false,
      },
      rarity: {
        type: DataTypes.INTEGER,
      },
      image_url: {
        type: DataTypes.STRING(255),
      },
    },
    {
      sequelize,
      modelName: "skins",
      timestamps: false,
    }
  );

  return Skin;
};
