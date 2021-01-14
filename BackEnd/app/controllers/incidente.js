//CONTROLLER REGISTOS INCIDENTES

const db = require("../models");
const Incidente = db.incidente;
const Crianca = db.crianca;
const Turma = db.turma;
const User = db.user;

const { Op } = require("sequelize");
const crianca = require("../models/crianca");

// Adicionar nova criança
// ????????????????????? "Unhandled rejection Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client" ????????????????????? 
exports.create = (req, res) => {
  const criancaId = req.body.criancaId;
  var condition = { criancaId: { [Op.like]:`%${criancaId}%` }}

  Incidente.create({
    descricao: req.body.descricao,
    data: req.body.data,
    comentario: req.body.comentario,
    anexo: req.body.anexo,
    criancaId: req.body.criancaId
  })
  .then(incidente => {
    if (req.body.users) {    
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
    } else {err => { 
        res.status(500).send({ message: err.message })}
    }
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  })
};

/*
//Encontrar Incidente por Crianca
/* SELECT * 
    FROM crianca_incidentes 
    INNER JOIN criancas ON criancas.id = crianca_incidentes.criancaId 
    INNER JOIN incidentes ON incidentes.id = crianca_incidentes.incidenteId
    WHERE criancas.id = ?; */
exports.findByCrianca = (req, res) => {
    const criancaId = req.params.criancaId;
    var condition = { criancaId: { [Op.like]:`%${criancaId}%` }}

    Incidente.findAll({
        where: condition,
        include : [
          { 
            model: Crianca,
            as: "crianca"
          }
        ]
      }).then(data => {
          res.send(data);
      }).catch(err => {
          res.status(500).send({
              message:
              err.message || "Some error ocurred"
          })
      });
}

// Find a single Turma with an id
/* SELECT * FROM incidentes WHERE id = ?; */
exports.findOne = (req, res) => {
  const id = req.params.id;

  Incidente.findByPk(id)
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

  Incidente.update(req.body, {
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

  Incidente.destroy({
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