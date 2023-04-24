const Sequelize = require("sequelize");
require('dotenv').config({path: "../.env"});

const sequelize = new Sequelize(
  process.env.DB_name,
  process.env.DB_user,
  process.env.DB_PW,
  {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
  }
);

module.exports = sequelize;
