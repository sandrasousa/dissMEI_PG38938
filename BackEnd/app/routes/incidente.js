const { authJwt } = require("../middleware");
const controller = require("../controllers/incidente");

module.exports = app => { 
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

    // Create a new Incidente
    app.post('/api/incidentes/add', authJwt.verifyToken, controller.create);

    // Encontrar Incidentes por id da Crianca
    app.get('/api/incidentes/crianca/:criancaId', authJwt.verifyToken, controller.findByCrianca);
  
    // Retrieve a single Incidente with id
    app.get('/api/incidentes/:id', authJwt.verifyToken, controller.findOne);

    // Update a Incidente with id
    app.put('/api/incidentes/update/:id', authJwt.verifyToken, controller.update);
  
    // Delete a Incidente with id
    app.delete('/api/incidentes/delete/:id', authJwt.verifyToken, controller.delete); 
  };