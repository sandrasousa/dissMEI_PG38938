module.exports = (sequelize, Sequelize) => {
    const Diario = sequelize.define("diarios", {
      descricao: {
        type: Sequelize.STRING(100),
        allowNull: false 
      },
      data: {
        type: Sequelize.DATE,
        allowNull: false                  
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

    return Diario;
  };