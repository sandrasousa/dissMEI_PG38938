const config = require("../config/db");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user")(sequelize, Sequelize);
db.role = require("./role")(sequelize, Sequelize);
db.turma = require("./turma")(sequelize, Sequelize);

// ligação user aos roles
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

// ligação user às turmas
db.user.belongsToMany(db.turma, {
  through: "turma_users",
  foreignKey: "userId",
  otherKey: "turmaId"
});
db.turma.belongsToMany(db.user, {
  through: "turma_users",
  foreignKey: "turmaId",
  otherKey: "userId"
});

//roles
db.ROLES = ["admin", "educacao", "responsavel"];

module.exports = db;