module.exports = (sequelize, Sequelize) => {
    const RMedico = sequelize.define("rmedicos", {
      tipoSanguineo: {
        type: Sequelize.STRING(100),
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

    return RMedico;
  };