const db = require("../models");
const config = require("../config/auth");
const User = db.user;
const Role = db.role;
const Crianca = db.crianca;
const Turma = db.turma;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            nome: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ message: "User registado com sucesso!" });
          });
        });
      } else {
        // user role = 2
        user.setRoles([2]).then(() => {
          res.send({ message: "User registered successfully!" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var criancas = [];
      user.getCriancas().then(crianca => {
        for (let i = 0; i < crianca.length; i++) {
          criancas.push(crianca[i].nome);
        }
        
      });

      var turmas = [];
      user.getTurmas().then(turma => {
        for (let i = 0; i < turma.length; i++) {
          turmas.push(turma[i].ano);
        }
      }); 

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].nome.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          nome: user.nome,
          apelido: user.apelido,
          dataNascimento: user.dataNascimento,
          sexo: user.sexo,
          morada: user.morada,
          contacto: user.contacto,
          roles: authorities,
          criancas: criancas,
          turmas: turmas,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
