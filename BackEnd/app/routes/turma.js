const { authJwt } = require("../middleware");
const controller = require("../controllers/turma");

module.exports = app => { 
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
    // Retrieve all Turmas
    app.get('/api/turmas', authJwt.verifyToken, controller.findTurmas);

    // Create a new Turma
    app.post('/api/turmas/add', authJwt.verifyToken, controller.create);
  
    // Retrieve all Turmas
    app.get('/api/turmas', authJwt.verifyToken, controller.findByAno);

    // Encontrar Crianças por Turma
    app.get('/turmas/criancas/:id', authJwt.verifyToken, controller.findByTurmaCriancas);
  
    // Retrieve a single Turmas with id
    app.get('/api/turmas/:id', authJwt.verifyToken, controller.findOne);

    // Update a Turma with id
    app.put('/api/turmas/update/:id', authJwt.verifyToken, controller.update);
  
    // Delete a Turma with id
    app.delete('/api/turmas/delete/:id', authJwt.verifyToken, controller.delete);
  };