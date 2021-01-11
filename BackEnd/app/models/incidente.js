module.exports = (sequelize, Sequelize) => {
    const Incidente = sequelize.define("incidentes", {
      descricao: {
        type: Sequelize.STRING(100),
        allowNull: false 
      },
      data: {
        type: Sequelize.DATEONLY                    ,
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

    return Incidente;
  };