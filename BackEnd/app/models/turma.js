module.exports = (sequelize, Sequelize) => {
    const Turma = sequelize.define("turmas", {
      ano: {
        type: Sequelize.STRING(50),
        allowNull: false 
      },
      classe: {
        type: Sequelize.STRING(50),
        allowNull: true 
      }
    });
  
    return Turma;
  };
  