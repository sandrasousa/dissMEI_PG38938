module.exports = (sequelize, Sequelize) => {
    const Crianca = sequelize.define("criancas", {
      nome: {
        type: Sequelize.STRING(100),
        allowNull: false 
      },
      apelido: {
        type: Sequelize.STRING(100),
        allowNull: false 
      },
      dataNascimento: {
        type: Sequelize.DATEONLY,
        allowNull: false 
      },
      sexo: {
        type: Sequelize.STRING(10),
        allowNull: false 
      }
    });

    return Crianca;
  };