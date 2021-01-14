const { verifySignUp } = require("../middleware/verifySignUp");
const controller = require("../controllers/auth");
const { authJwt } = require("../middleware");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/auth/signup",
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);

   // Retrieve all Turmas
   app.get('/api/auth/users', authJwt.verifyToken, authJwt.isAdmin, controller.fintUsers);

  // Retrieve a single Turmas with id
    app.get('/api/auth/users/:id', authJwt.verifyToken, authJwt.isEducacaoOrAdmin, controller.findOne);

   // Update a Turma with id
   app.put('/api/auth/users/update/:id', authJwt.verifyToken, authJwt.isAdmin, controller.update);
  
   // Delete a Turma with id
   app.delete('/api/auth/users/delete/:id', authJwt.verifyToken, authJwt.isAdmin, controller.delete);
};
