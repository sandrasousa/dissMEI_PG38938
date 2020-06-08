const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// database
const db = require("./app/models");
/*PARA CRIAR OS ROLES -- correr duas vezes (node sever.js)*/
//const Role = db.role;

db.sequelize.sync();

// index
app.get("/", (req, res) => {
  res.json({ message: "BEM VINDO" });
});

// routes
// autenticação
require('./app/routes/auth')(app);
// utilizadores
require('./app/routes/user')(app);
// turmas
require("./app/routes/turma")(app);
// crianca
require("./app/routes/crianca")(app);
// incidente
require("./app/routes/incidente")(app);
    
/////////////SERVIDOR/////////////
// localhost:4000
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

/*PARA CRIAR OS ROLES -- norrer duas vezes (node sever.js)
  Role.create({
    id: 1,
    nome: "admin"
  });
 
  Role.create({
    id: 2,
    nome: "educacao"
  });
 
  Role.create({
    id: 3,
    nome: "responsavel"
  }); */