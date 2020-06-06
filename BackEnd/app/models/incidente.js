module.exports = (sequelize, Sequelize) => {
    const Incidente = sequelize.define("incidentes", {
      descricao: {
        type: Sequelize.STRING(100)
      },
      data: {
        type: Sequelize.DATE                        
      },
      comentario: {
        type: Sequelize.STRING(1000)
      },
      anexo: {
        type: Sequelize.STRING
      }
    });

    return Incidente;
  };