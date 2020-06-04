exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
  
  exports.educacaoBoard = (req, res) => {
    res.status(200).send("Educação Content.");
  };
  
  exports.responsavelBoard = (req, res) => {
    res.status(200).send("Responsável Content.");
  };
  