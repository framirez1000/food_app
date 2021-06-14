import fs from 'fs';
import path from 'path';
//
import '../config/loadEnv';
//import dotenv from 'dotenv';
//import { config } from 'dotenv';
import { Sequelize } from 'sequelize';
//require('dotenv').config();

//dotenv.config({ silent: process.env.NODE_ENV === 'test' });

var util = require('util');


const basename = path.basename(__filename);
const env = process.env.NODE_ENV;
//console.log('Config: ' + util.inspect(process.env.NODE_ENV));
const config = require('../config/config.js')[env];
const db = {};
//console.log('Config: ' + process.env + config);
const sequelize = new Sequelize(config.database, config.username, config.password, config);
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
