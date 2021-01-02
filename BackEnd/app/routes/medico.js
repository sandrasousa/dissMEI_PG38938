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
    app.post('/api/rmedicos/add', authJwt.verifyToken, controller.create);

    // Encontrar Incidentes por id da Crianca
    app.get('/api/remdicos/crianca', controller.findByCrianca);
  
    // Retrieve a single Incidente with id
    app.get('/api/rmedicos/:id', authJwt.verifyToken, controller.findOne);

    // Update a Incidente with id
    app.put('/api/rmedicos/update/:id', authJwt.verifyToken, controller.update);
  
    // Delete a Incidente with id
    app.delete('/api/rmedicos/delete/:id', authJwt.verifyToken, controller.delete); 
  };