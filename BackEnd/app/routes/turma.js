module.exports = app => {
    const turmas = require("../controllers/turma");
  
    var router = require("express").Router();
  
    // Create a new Turma
    router.post("/add", turmas.create);
  
    // Retrieve all Turmas
    router.get("/", turmas.findByAno);
  
    // Retrieve a single Turmas with id
    router.get("/:id", turmas.findOne);
  
    // Update a Turma with id
    router.put("/:id", turmas.update);
  
    // Delete a Turma with id
    router.delete("/:id", turmas.delete);
  
    app.use('/api/turmas', router);
  };