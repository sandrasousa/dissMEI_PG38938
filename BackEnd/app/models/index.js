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
db.crianca = require("./crianca")(sequelize, Sequelize);
db.incidente = require("./incidente")(sequelize, Sequelize);
db.pmedico = require("./medico")(sequelize, Sequelize);

///// ligação user aos roles /////
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
///////////////////////////////////

////// ligação user às turmas //////
db.user.belongsToMany(db.turma, {
  through: "user_turmas",
  foreignKey: "userId",
  otherKey: "turmaId"
});
db.turma.belongsToMany(db.user, {
  through: "user_turmas",
  foreignKey: "turmaId",
  otherKey: "userId"
});
///////////////////////////////////

/// ligação criancas às turmas ///

db.turma.hasMany(db.crianca, { as: "criancas" });
db.crianca.belongsTo(db.turma, {
  foreignKey: "turmaId",
  as: "turma"
});
// this will add the attribute DadId to Person
///////////////////////////////////

//// ligação user às criancas ////
db.user.belongsToMany(db.crianca, {
  through: "user_criancas",
  foreignKey: "userId",
  otherKey: "criancaId"
});
db.crianca.belongsToMany(db.user, {
  through: "user_criancas",
  foreignKey: "criancaId",
  otherKey: "userId"
});
///////////////////////////////////

//// ligação criança a incidentes ////
db.crianca.hasMany(db.incidente, { as: "incidentes" });
db.incidente.belongsTo(db.crianca, {
  foreignKey: "criancaId",
  as: "crianca"
});
///////////////////////////////////

//// ligação user a incidentes ////
db.user.belongsToMany(db.incidente, {
  through: "user_incidentes",
  foreignKey: "userId",
  otherKey: "incidenteId"
});
db.incidente.belongsToMany(db.user, {
  through: "user_incidentes",
  foreignKey: "incidenteId",
  otherKey: "userId"
});
///////////////////////////////////

//// ligação criança a perfil medico ////
db.crianca.hasMany(db.pmedico, { as: "rmedicos" });
db.pmedico.belongsTo(db.crianca, {
  foreignKey: "criancaId",
  as: "crianca"
});
///////////////////////////////////

/*roles
db.ROLES = ["admin", "educacao", "responsavel"]; */

module.exports = db;