module.exports = (sequelize, Sequelize) => {
    const Turma = sequelize.define("turmas", {
      ano: {
        type: Sequelize.STRING(50)
      },
      classe: {
        type: Sequelize.STRING(50)
      }
    });
  
    return Turma;
  };
  