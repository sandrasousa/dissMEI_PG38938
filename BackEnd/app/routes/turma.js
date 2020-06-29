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
    app.get('/api/turmas', authJwt.verifyToken, authJwt.isEducacaoOrAdmin, controller.findTurmas);

    // Create a new Turma
    app.post('/api/turmas/add', authJwt.verifyToken, authJwt.isAdmin, controller.create);
  
    // Retrieve all Turmas
    app.get('/api/turmas', controller.findByAno);

    // Encontrar Crianças por Turma
    app.get('/api/turmas/criancas/:id', authJwt.verifyToken, authJwt.isEducacaoOrAdmin, controller.findByTurmaCriancas);

    // Encontrar Crianças por Turma
    app.get('/api/turmas/criancas', controller.findByAnoCriancas);

     // Encontrar Users por Turma
     app.get('/api/turmas/users/:id', authJwt.verifyToken, authJwt.isEducacaoOrAdmin, controller.findByTurmaUsers);
  
    // Retrieve a single Turmas with id
    app.get('/api/turmas/:id', authJwt.verifyToken, authJwt.isEducacaoOrAdmin, controller.findOne);

    // Update a Turma with id
    app.put('/api/turmas/update/:id', authJwt.verifyToken, authJwt.isAdmin, controller.update);
  
    // Delete a Turma with id
    app.delete('/api/turmas/delete/:id', authJwt.verifyToken, authJwt.isAdmin, controller.delete);
  };