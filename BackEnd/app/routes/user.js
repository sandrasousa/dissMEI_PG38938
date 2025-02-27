const { authJwt } = require("../middleware");
const controller = require("../controllers/user");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/all", controller.allAccess);

  app.get(
    "/api/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  app.get(
    "/api/educacao",
    [authJwt.verifyToken, authJwt.isEducacao],
    controller.educacaoBoard
  );

  app.get("/api/responsavel",
    [authJwt.verifyToken, authJwt.isResponsavel],
    controller.responsavelBoard
  );
};