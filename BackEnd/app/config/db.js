/* conexão à Base de Dados*/

module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "root",
    DB: "dissMEI",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
};
  