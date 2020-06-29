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
    
    app.get('/api/criancas', authJwt.verifyToken, authJwt.isEducacaoOrAdmin, controller.findCrianca);

    // Create a new Turma
    app.post('/api/criancas/add', authJwt.verifyToken, authJwt.isAdmin, controller.create);
  
    // Retrieve all Crianças por Nome
    app.get('/api/criancas', authJwt.verifyToken, controller.findByNome);
  
    // Retrieve a single Turmas with id
    app.get('/api/criancas/:id', authJwt.verifyToken, controller.findOne);
  
    // Update a Turma with id
    app.put('/api/criancas/update/:id', authJwt.verifyToken, authJwt.isAdmin, controller.update);
  
    // Delete a Turma with id
    app.delete('/api/criancas/delete/:id', authJwt.verifyToken, authJwt.isAdmin, controller.delete);
  };