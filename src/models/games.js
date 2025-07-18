const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Game extends Model {}

  Game.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(45),
      },
      // Vous pouvez ajouter d'autres champs ici si nécessaire pour votre jeu.
    },
    {
      sequelize,
      modelName: "games",
      timestamps: false,
    }
  );

  return Game;
};
