import React, { Component } from "react";
import { Table } from 'reactstrap';

import TurmaDataService from "../services/turma_service";

import "../style/board_admin.css";

export default class Turma extends Component {
  state = {
    criancas: []
  }

  componentDidMount() {
    this.getCriancaTurma();
  }

  getCriancaTurma = _ => {
    TurmaDataService.findByTurmaCriancas()
      .then(response => this.setState({ criancas: response.data}))
      .catch(err => console.error(err))
  }

  /* DEVOLVE DEMASIADAS A TURMA A QUANTIDADE DE VEZES QUE TEM CRIANÇAS */ /* DEVOLVE APENAS PARA A PRIMEIRA CRIANCA  renderTurma = ({ idturma, ano, turma}) => <div key={idturma}> <h4>{ano}</h4> <h4>{turma != null ? turma : ' '}</h4> </div>
  renderCriancas = ({ idcrianca, idturma, turma_idturma, nome, apelido, dataNascimento, sexo }) => <tr> <td><Link to={`/crianca/${idcrianca}`}>{idcrianca}</Link></td> <td>{nome}</td> <td>{apelido}</td> <td>{dataNascimento}</td> <td>{sexo}</td> <td><Link to={`/rmedico/${idcrianca}`}> Registo Médico </Link></td> </tr>*/

  render() {
    const { criancas  } = this.state;
    return (
      <div className="App container">
        <div className="col-xs-6">
          <Table  striped bordered hover>
            <thead>
              <tr>
                <th> <h5> Ano </h5> </th>
                <th> <h5> Classe </h5> </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {criancas.map((crianca) =>
                <tr>
                  <td>{crianca.nome}</td>
                  <td>{crianca.apelido}</td>
                  <td>{crianca.dataNascimento}</td>
                </tr>
              )}
             </tbody>
          </Table>
        </div>
      </div>
        )
  }
}