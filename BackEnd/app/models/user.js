module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      username: {
        type: Sequelize.STRING(10),
        allowNull: false 
      },
      email: {
        type: Sequelize.STRING(50),
        allowNull: false 
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: false 
      },
      nome: {
        type: Sequelize.STRING(100),
        allowNull: true 
      },
      apelido: {
        type: Sequelize.STRING(100),
        allowNull: true 
      },
      dataNascimento: {
        type: Sequelize.DATEONLY,
        allowNull: true 
      },
      sexo: {
        type: Sequelize.STRING(10),
        allowNull: true 
      },
      morada: {
        type: Sequelize.STRING(100),
        allowNull: true 
      },
      contacto: {
        type: Sequelize.INTEGER(9),
        allowNull: true 
      }
    });
  
    return User;
  };