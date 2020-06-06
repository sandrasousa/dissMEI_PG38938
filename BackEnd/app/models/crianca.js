module.exports = (sequelize, Sequelize) => {
    const Crianca = sequelize.define("criancas", {
      nome: {
        type: Sequelize.STRING(100)
      },
      apelido: {
        type: Sequelize.STRING(100)
      },
      dataNascimento: {
        type: Sequelize.DATEONLY
      },
      sexo: {
        type: Sequelize.STRING(10)
      }
    });

    return Crianca;
  };