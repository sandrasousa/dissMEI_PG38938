import React, { Component } from "react";

import TurmaDataService from "../../services/turma_service";
import CriancaDataService from "../../services/crianca_service";

import "../../style/board_admin.css";

export default class Turma extends Component {
  constructor(props) {
    super(props);
    
    this.refreshList = this.refreshList.bind(this);
    this.setActiveCriancas = this.setActiveCriancas.bind(this);
    this.searchCrianca = this.searchCrianca.bind(this);
    this.onChangeCrianca = this.onChangeCrianca.bind(this);
    this.getTurma = this.getTurma.bind(this);
    this.getCriancas = this.getCriancas.bind(this);

    this.state = {
      criancas:[],
      currentCrianca: null,
      currentIndex: -1,
      searchCrianca: ""
    };
  }

  componentDidMount() {
    this.getTurma(this.props.match.params.id);
    this.getCriancas(this.props.match.params.id);
  }

  //LISTAR TURMAS
  onChangeCrianca(e) {
    const searchCrianca = e.target.value;

    this.setState({
      searchCrianca: searchCrianca
    });
  }

  searchCrianca() {
    CriancaDataService.findByNome(this.state.searchCrianca)
      .then(response => {
        this.setState({
          criancas: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  
  refreshList() {
    this.getCriancas();
    this.setState({
      currentCrianca: null,
      currentIndex: -1
    });
  }

  setActiveCriancas(crianca, index) {
    this.setState({
      currentCrianca: crianca,
      currentIndex: index
    });
  }

  getTurma(id) {
    TurmaDataService.get(id)
      .then(response => {
        this.setState({
          currentTurma: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  getCriancas(id) {
    TurmaDataService.findByTurmaCriancas(id)
    .then(response => {
      this.setState({
        criancas: response.data
      });
      console.log(response.data);
    })
    .catch(e=> {
      console.log(e);
    });
  }

  render() {
    const { searchCrianca, currentTurma, criancas } = this.state;

    return (
      <div className="container">

        <div className="container">
        <div className="search">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Procurar por Ano"
                value={searchCrianca}
                onChange={this.onChangeCrianca}
              />
              <div className="input-group-append">
                <button
                  className="btn"
                  type="button"
                  onClick={this.searchCrianca}
                >
                  Procurar
                </button>
              </div>
            </div>
          </div>
          </div>

        {currentTurma ? (
          <div className="list">
            <h4>Turma</h4>
                <p>{currentTurma.ano} {currentTurma.classe} </p>

                <br/>
            
            {criancas ? (
               <div className="container">
               <div className="List">
                   <table>
                     <thead>
                       <tr>
                         <th>Nome</th>
                         <th>Apelido</th>
                         <th>Data de Nascimento</th>
                         <th>Sexo</th>
                       </tr>
                     </thead>
                     <tbody>
                     {criancas &&
                         criancas.map((crianca, index) => ( 
                           <tr key={crianca.id}>
                             <td>{crianca.nome}</td>
                             <td>{crianca.apelido}</td>
                             <td>{crianca.dataNascimento}</td>
                             <td>{crianca.sexo}</td>
                           </tr>
                         )
                     )}
                     </tbody>
                   </table>
                   </div>
                   </div>
            ): (
              <p> Num tem </p>

            )}
            <strong>Responsável:</strong>

            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Turma...</p>
          </div>
        )}
      </div>
    );
  }
}
