const db = require("../models");
const Incidente = db.incidente;
const Crianca = db.crianca;
const Turma = db.turma;
const User = db.user;

const { Op } = require("sequelize");

// Adicionar nova criança
// ????????????????????? DÁ UM ERRO NAS HEADERS ????????????????????? 
exports.create = (req, res) => {

   // Validate request
   if (!req.body.descricao) {
    res.status(400).send({
      message: "O conteúdo não pode estar vazio!"
    })
    return;
  }

  // Salvar incidente
  Incidente.create({
    descricao: req.body.descricao,
    data: req.body.data,
    comentario: req.body.comentario,
    anexo: req.body.anexo
  })
  .then(incidente => {
    if (req.body.criancas && req.body.users) {
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
        incidente.setCriancas(criancas).then(() => {
          res.send({ message: "Incidente registada com sucesso!" });
        });
      });
      
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
          incidente.setUsers(users).then(() => {
            res.send({ message: "Incidente registada com sucesso!" });
          });
        });
    } else {
        res.status(500).send({ message: err.message });
    }
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
};

/*
//Encontrar Crianças por Turma
/* SELECT * FROM criancas WHERE turmaId = ?;
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

// Find a single Turma with an id
/* SELECT * FROM criancas WHERE id = ?; 
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
}; */