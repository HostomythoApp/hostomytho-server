const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class UserCriminal extends Model {}

  UserCriminal.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      criminal_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "criminals",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "user_criminals",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: false,
    }
  );

  return UserCriminal;
};
