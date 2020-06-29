const db = require("../models");

const Turma = db.turma;
const User = db.user;
const Crianca = db.crianca;

const { Op } = require("sequelize");

// Create and Save a new Turma
exports.create = (req, res) => {
  // Save turma to Database
  Turma.create({
    ano: req.body.ano,
    classe: req.body.classe
  })
  .then(turma => {
    if (req.body.criancas || req.body.users) {
      Crianca.findAll({
        where: {
            nome: {
                [Op.or]: req.body.criancas
            },
            apelido : {
                [Op.or]: req.body.criancas
            }
        }
      }).then(criancas => {
        turma.setCriancas(criancas).then(() => {
          res.send({ message: "Incidente registada com sucesso!" });
        });
      })      
      User.findAll({
          where: {
              nome: {
                  [Op.or]: req.body.users
              },
              apelido : {
                  [Op.or]: req.body.users
              }
          }
        }).then(users => {
          turma.setUsers(users).then(() => {
            res.send({ message: "Incidente registada com sucesso!" });
          });
        });
    } else {err => { 
        res.status(500).send({ message: err.message })}
    }
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  })
};

// Encontrar todas as turmas
exports.findTurmas = (req, res) => {

  Turma.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};


//Encontrar Crianças por Turma
/* SELECT * FROM criancas INNER JOIN turmas WHERE turmas.id = ?;*/
exports.findByTurmaCriancas = (req, res) => { 
  const id = req.params.id;

  Crianca.findAll({
    include: [{
      model: Turma,
      as: "turma",
      where: {id
      }
    }]
   
  })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving tutorials."
    });
  });
};

//Encontrar Crianças por Turma
/* SELECT * FROM criancas INNER JOIN turmas WHERE turmas.ano = ?;*/
exports.findByAnoCriancas = (req, res) => { 
  const ano = req.query.ano;
  var condition = ano ? { ano: { [Op.like]: `%${ano}%` } } : null;

  Crianca.findAll({
    include: [{
      model: Turma,
      as: "turma",
      where: condition 
    }]
  })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving tutorials."
    });
  });
};

//Encontrar Users por Turma
/* SELECT * FROM criancas INNER JOIN turmas WHERE turmas.id = ?;*/
exports.findByTurmaUsers = (req, res) => { 
  const id = req.params.id;

  User.findAll({
    include: [{
      model: Turma,
      through: "turma_users",
      where: {id
      }
    }]
   
  })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving tutorials."
    });
  });
};

// Encontrar todas as turmas por ano
exports.findByAno = (req, res) => {
  const ano = req.query.ano;
  var condition = ano ? { ano: { [Op.like]: `%${ano}%` } } : null;

  Turma.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

//Encontrar turma por id 
exports.findOne = (req, res) => {
  const id = req.params.id;

  Turma.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Turma with id=" + id
      });
    });
};

// Update a Turma by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Turma.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Turma was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Turma with id=${id}. Maybe Turma was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Turma with id=" + id
      });
    });
};

// Delete a Turma with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Turma.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Turma was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Turma with id=${id}. Maybe Turma was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Turma with id=" + id
      });
    });
};
