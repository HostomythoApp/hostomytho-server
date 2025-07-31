const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {}

  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM,
        values: ["inconnu", "medecin", "autre"],
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(255),
        defaultValue: "",
        allowNull: true,
        unique: true,
      },
      points: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      monthly_points: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      trust_index: {
        type: DataTypes.TINYINT(1),
        defaultValue: 50,
      },
      notifications_enabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      gender: {
        type: DataTypes.ENUM,
        values: ["homme", "femme"],
        allowNull: false,
        defaultValue: "homme",
      },
      color_skin: {
        type: DataTypes.ENUM,
        values: ["clear", "medium", "dark"],
        allowNull: false,
      },
      moderator: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      catch_probability: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      consecutive_days_played: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      last_played_date: {
        type: DataTypes.STRING(45),
      },
      created_at: {
        type: DataTypes.STRING(45),
      },
      coeff_multi: {
        type: DataTypes.DECIMAL(2, 1),
        defaultValue: 1.0,
      },
      nb_first_monthly: {
        type: DataTypes.TINYINT(4),
        defaultValue: 0,
      },
      tutorial_progress: {
        type: DataTypes.TINYINT(4),
        defaultValue: 0,
      },
      message_read: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "users",
      timestamps: false,
    }
  );

  return User;
};
