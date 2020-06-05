module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      username: {
        type: Sequelize.STRING(10)
      },
      email: {
        type: Sequelize.STRING(50)
      },
      password: {
        type: Sequelize.STRING(100)
      },
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
      },
      morada: {
        type: Sequelize.STRING(100)
      },
      contacto: {
        type: Sequelize.INTEGER(9)
      }
    });
  
    return User;
  };