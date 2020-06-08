use dissmei;

SELECT criancas.nome, criancas.apelido, incidentes.descricao, incidentes.comentario, incidentes.anexo
FROM crianca_incidentes 
INNER JOIN criancas ON criancas.id = crianca_incidentes.criancaId
INNER JOIN incidentes ON incidentes.id = crianca_incidentes.incidenteId
WHERE crianca_incidentes.criancaId = 2;