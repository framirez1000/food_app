import fs from 'fs';
import path from 'path';
//
//import '../config/loadEnv';
//import dotenv from 'dotenv';
//import { Sequelize } from 'sequelize';

//dotenv.config({ silent: process.env.NODE_ENV === 'test' });

var util = require('util');

/* 
DB connection
*/
const env = process.env.NODE_ENV;
const configDb = require('../config/config.js')[env];
const pool = require('../config/config.js')['pool'];
console.log("Connection to DB with ENV: " + env );
console.log("Connection to DB with credentials: " + util.inspect(configDb));
const Sequelize = require("sequelize");
const sequelize = new Sequelize(configDb.database, configDb.username, configDb.password, {
  host: configDb.host,
  port: configDb.port,
  dialect: configDb.dialect,
  operatorsAliases: false,
  logging: false,

  pool: {
    max: pool.max,
    min: pool.min,
    acquire: pool.acquire,
    idle: pool.idle
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to delivery db \"' + configDb.database + '\" has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to delivery db \"' + configDb.database + '\" ', err);
  });
/* end db connection*/


const basename = path.basename(__filename);
//const env = process.env.NODE_ENV;
//console.log('Config: ' + util.inspect(process.env.NODE_ENV));
//const config = require('../config/config.js')[env];
const db = {};
//console.log('ConfigUsername + env: ' + config.username + env);
//const sequelize = new Sequelize(config.database, config.username, config.password, config);
//var sequelize = new Sequelize(process.env.DEV_DB_DATABASE, process.env.DEV_DB_USERNAME, process.env.DEV_DB_PASSWORD, config);

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
