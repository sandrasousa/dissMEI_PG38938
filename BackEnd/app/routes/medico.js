const { authJwt } = require("../middleware");
const controller = require("../controllers/medico");

module.exports = app => { 
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

    // Create a new Registo Medico
    app.post('/api/pmedicos/add', authJwt.verifyToken, controller.create);

    // Encontrar Incidentes por id da Crianca
    app.get('/api/pmedicos/crianca/:criancaId', controller.findByCrianca);
  
    // Retrieve a single Incidente with id
    app.get('/api/pmedicos/:id', authJwt.verifyToken, controller.findOne);

    // Update a Incidente with id
    app.put('/api/pmedicos/update/:id', authJwt.verifyToken, authJwt.isAdmin, controller.update);
  
    // Delete a Incidente with id
    app.delete('/api/pmedicos/delete/:id', authJwt.verifyToken, authJwt.isAdmin, controller.delete); 
  };