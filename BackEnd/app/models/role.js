module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("roles", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false 
      }
    });

    return Role;
  };
