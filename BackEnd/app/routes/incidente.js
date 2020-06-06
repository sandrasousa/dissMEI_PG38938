const controller = require("../controllers/incidente");

module.exports = app => { 
    // Create a new Turma
    app.post('/api/incidente/add', controller.create);
  
    /* Retrieve all Turmas
    app.get('/api/turmas', controller.findByAno);
  
    // Retrieve a single Turmas with id
    app.get('/api/turmas/:id', controller.findOne);

    app.get('/api/criancas/turmas', controller.findByTurma);

    // Update a Turma with id
    app.put('/api/turmas/update/:id', controller.update);
  
    // Delete a Turma with id
    app.delete('/api/turmas/delete/:id', controller.delete); */
  };