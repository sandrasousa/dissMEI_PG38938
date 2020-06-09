const db = require("../models");
const Crianca = db.crianca;
const Turma = db.turma;
const User = db.user;

const { Op } = require("sequelize");

// Adicionar nova criança
exports.create = (req, res) => {
  Crianca.create({
    nome: req.body.nome,
    apelido: req.body.apelido,
    dataNasicmento: req.body.dataNasicmento,
    sexo: req.body.sexo
  })
  .then(crianca => {
    if (req.body.turmas || req.body.users) {
      Turma.findAll({
        where: {
            ano: {
                [Op.or]: req.body.turmas
            },
            classe : {
                [Op.or]: req.body.turmas
            }
        }
      }).then(turmas => {
        crianca.setTurmas(turmas).then(() => {
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
          crianca.setUsers(users).then(() => {
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

// Encontrar todas as Crianças por nome e apelido
/* SELECT * FROM criancas WHERE nome = ? OR apelido = ?; */
exports.findByNome = (req, res) => {
  const nome = req.query.nome;
  const apelido = req.query.apelido;
  var condition = { [Op.or]: [{ nome: { [Op.like]:`%${nome}%` }}, { apelido: { [Op.like]:`%${apelido}%` }}] }

  Crianca.findAll({ where: condition })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving crianças."
    });
  });
};

// Find a single Turma with an id
/* SELECT * FROM criancas WHERE id = ?; */
exports.findOne = (req, res) => {
  const id = req.params.id;

  Crianca.findByPk(id)
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

  Crianca.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Turma was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Crianca with id=${id}. Maybe Crianca was not found or req.body is empty!`
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

  Crianca.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Crianca was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Crianca with id=${id}. Maybe Crianca was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Crianca with id=" + id
      });
    });
};