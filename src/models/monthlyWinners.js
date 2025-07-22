const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class MonthlyWinners extends Model {}

  MonthlyWinners.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "SET NULL",
        onUpdate: "SET NULL",
      },
      username: {
        type: DataTypes.STRING(50),
      },
      points: {
        type: DataTypes.INTEGER,
      },
      ranking: {
        type: DataTypes.TINYINT(4),
      },
    },
    {
      sequelize,
      modelName: "monthly_winners",
      timestamps: false,
    }
  );

  return MonthlyWinners;
};
