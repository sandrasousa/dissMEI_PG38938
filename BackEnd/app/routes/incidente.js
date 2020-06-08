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
    app.post('/api/incidente/add', authJwt.verifyToken, controller.create);

    // Encontrar Incidentes por id da Crianca
    app.get('/api/incidentes/crianca', authJwt.verifyToken, controller.findByCrianca);
  
    // Retrieve a single Incidente with id
    app.get('/api/incidente/:id', authJwt.verifyToken, controller.findOne);

    // Update a Incidente with id
    app.put('/api/incidente/update/:id', authJwt.verifyToken, controller.update);
  
    // Delete a Incidente with id
    app.delete('/api/incidente/delete/:id', authJwt.verifyToken, controller.delete); 
  };