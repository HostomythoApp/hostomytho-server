require("dotenv").config();
const { Sequelize } = require("sequelize");
const db_config = require("../../db/config/config")[process.env.NODE_ENV];

const sequelize = new Sequelize(db_config.database, db_config.username, db_config.password, {
  host: db_config.host,
  dialect: db_config.dialect,
  logging: false,
  timezone: "+02:00",
  define: {
    timestamps: false,
    freezeTableName: true,
  },
});

const connectToDb = async () => {
  console.log("connectToDb");
  try {
    await sequelize.authenticate();
    console.log("Successfully connected to our db");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { sequelize, connectToDb };
