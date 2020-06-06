const controller = require("../controllers/crianca");

module.exports = app => { 
    // Create a new Turma
    app.post('/api/criancas/add', controller.create);
  
    // Retrieve all Turmas
    app.get('/api/criancas', controller.findByNome);
  
    // Retrieve a single Turmas with id
    app.get('/api/criancas/:id', controller.findOne);
  
    // Update a Turma with id
    app.put('/api/criancas/update/:id', controller.update);
  
    // Delete a Turma with id
    app.delete('/api/criancas/delete/:id', controller.delete);
  };