const jwt = require("jsonwebtoken");
const config = require("../config/auth");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "Faça login para aceder!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Sem autorização!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].nome === "admin") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require Admin Role!"
      });
      return;
    });
  });
};

isEducacao = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].nome === "educacao") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Educação Role!"
      });
    });
  });
};

isResponsavel = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].nome === "responsavel") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Responsavel Role!"
      });
    });
  });
};

isEducacaoOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].nome === "educacao") {
          next();
          return;
        }

        if (roles[i].nome === "admin") {
          next();
          return;
        }
        
      }
      res.status(403).send({
        message: "Require Educacao or Admin Role!"
      });
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isEducacao: isEducacao,
  isResponsavel: isResponsavel,
  isEducacaoOrAdmin: isEducacaoOrAdmin
};

module.exports = authJwt;
