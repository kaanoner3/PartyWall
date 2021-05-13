import { Sequelize } from "sequelize";
import * as fs from "fs";
import path from "path";
import { config } from "../config";

const sequelize = new Sequelize(
  `postgres://${config.username}:${config.password}@${config.host}:${config.port}/${config.database}`
);

let basename = path.basename(module.filename);
let db: any = {};

fs.readdirSync(__dirname)
  .filter(function (file) {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".ts"
    );
  })
  .forEach(function (file) {
    console.log("file", file);

    let model = require(path.join(__dirname, file))(sequelize);
    db[model.name] = model;
  });

Object.keys(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
