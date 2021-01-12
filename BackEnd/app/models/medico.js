module.exports = (sequelize, Sequelize) => {
    const PMedico = sequelize.define("pmedicos", {
      tipoSanguineo: {
        type: Sequelize.STRING(100),
        allowNull: false 
      },
      alergia: {
        type: Sequelize.STRING(1000),
        allowNull: true 
      },
      doenca: {
        type: Sequelize.STRING(1000),
        allowNull: true 
      },
      lesao: {
        type: Sequelize.STRING(1000),
        allowNull: true 
      },
      comentario: {
        type: Sequelize.STRING(1000),
        allowNull: true 
      },
      anexo: {
        type: Sequelize.STRING,
        allowNull: true 
      }
    });

    return PMedico;
  };