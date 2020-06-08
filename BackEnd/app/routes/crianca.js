const { authJwt } = require("../middleware");
const controller = require("../controllers/crianca");

module.exports = app => {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  
    // Create a new Turma
    app.post('/api/criancas/add', authJwt.verifyToken, controller.create);
  
    // Retrieve all Turmas
    app.get('/api/criancas', authJwt.verifyToken, controller.findByNome);

    // Encontrar Crianças por Turma
    app.get('/api/criancas/turma', authJwt.verifyToken, controller.findByTurma);
  
    // Retrieve a single Turmas with id
    app.get('/api/criancas/:id', authJwt.verifyToken, controller.findOne);
  
    // Update a Turma with id
    app.put('/api/criancas/update/:id', authJwt.verifyToken, controller.update);
  
    // Delete a Turma with id
    app.delete('/api/criancas/delete/:id', authJwt.verifyToken, controller.delete);
  };