const db = require("../models");
const Turma = db.turma;
const User = db.user;
const Crianca = db.crianca;

const { Op } = require("sequelize");

// Create and Save a new Turma
exports.create = (req, res) => {

   // Validate request
   if (!req.body.ano) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Save turma to Database
  Turma.create({
    ano: req.body.ano,
    classe: req.body.classe
  })
    .then(turma => {
      if (req.body.users) {
        User.findAll({
          where: {
            nome: {
              [Op.or]: req.body.users
            }
          }
        }).then(users => {
          turma.setUsers(users).then(() => {
            res.send({ message: "Turma registada com sucesso!" });
          });
        });
      } else {
        res.send({ message: "Turma adicionada sem educador!" });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
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

//Encontrar Crianças por Turma
/* SELECT * FROM criancas WHERE turmaId = ?;*/
exports.findByTurma = (req, res) => {
  const turmaId = req.query.turmaId;
  var condition = turmaId ? { turmaId: { [Op.like]: `%${turmaId}%` } } : null;

  Crianca.findAll({ where: condition })
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
