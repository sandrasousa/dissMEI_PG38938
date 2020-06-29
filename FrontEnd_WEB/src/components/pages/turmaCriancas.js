import React, { Component } from "react";
import { Link } from "react-router-dom";

import TurmaDataService from "../../services/turma_service";
import CriancaDataService from "../../services/crianca_service";

import "../../style/board_admin.css";

export default class Turma extends Component {
  constructor(props) {
    super(props);
    
    this.refreshList = this.refreshList.bind(this);
    this.setActiveCriancas = this.setActiveCriancas.bind(this);
    this.searchCrianca = this.searchCrianca.bind(this);
    this.onChangeSearchCrianca = this.onChangeSearchCrianca.bind(this);

    this.state = {
      currentTurma:[],
      criancas:[],
      currentCrianca: null,
      currentIndex: -1,
      searchCrianca: "",
      
      users:[]
    };
  }

  componentDidMount() {
    this.getTurma(this.props.match.params.ano);
    this.getCriancas(this.props.match.params.id);
    this.getUsers(this.props.match.params.id);
  }

  //LISTAR TURMAS
  onChangeSearchCrianca(e) {
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
    this.getTurma();
    this.getCriancas();
    this.setState({
      currentCrianca: null,
      currentIndex: -1
    });
    this.getUsers();
  }

  setActiveCriancas(crianca, index) {
    this.setState({
      currentCrianca: crianca,
      currentIndex: index
    });
  }

  getTurma(ano) {
    TurmaDataService.findByAnoCriancas(ano)
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

  getUsers(id) {
    TurmaDataService.findByTurmaUsers(id)
    .then(response => {
      this.setState({
        users: response.data
      });
      console.log(response.data);
    })
    .catch(e=> {
      console.log(e);
    });
  }

  render() {
    const { searchCrianca, currentTurma, currentCrianca, currentIndex, criancas, users } = this.state;

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
                onChange={this.onChangeSearchCrianca}
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
                     {criancas && criancas.map((crianca, index) => ( 
                        <tr key={crianca.id}>
                          <td className={
                        " " +
                        (index === currentIndex ? "" : "")
                      }
                      onClick={() => this.setActiveCriancas(crianca, index)}
                      key={index}>{crianca.nome}</td>
                          <td>{crianca.apelido}</td>
                          <td><label type="date">{crianca.dataNascimento}</label></td>
                          <td>{crianca.sexo}</td>
                        </tr>
                        )
                    )}
                     </tbody>
                   </table>
                   </div>
                   </div>
            ) : (

              <div className="container">
              <p> <i>Ainda não tem crianças!</i> </p>
              <hr/>
              </div>
            )}

        <div className="col-md-6">
            {currentCrianca ? (
              <div>
                <h4>Turma</h4>
                <div>
                  <label>
                    <strong>Ano:</strong>
                  </label>{" "}
                  {currentCrianca.nome}
                </div>
                <div>
                  <label>
                    <strong>Classe:</strong>
                  </label>{" "}
                  {currentCrianca.apelido}
                </div> 
                
                <Link
                  to={"/crianca/" + currentCrianca.id}
                  className="btn"
                >
                Edit
                </Link>
                
              </div>
            ) : (
              <div>
                <br />
                <small><i>Clique numa turma para mais detalhes</i></small>
              </div>
            )}
          </div>


            <br/> <br/>
            
            {users ? (
               <div className="container">
               <div className="List">
                   <strong> Responsável </strong>
                     {users.map((user) => ( 
                        <p key={user.id}> {user.nome} {user.apelido} </p>
                        )
                    )}

                   </div>
                   </div>
            ) : (

              <div className="container">
              <p> <i>Ainda não tem responsável definido!</i> </p>
              </div>

            )}


            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Turma não encontrada!</p>
          </div>
        )}
      </div>
    );
  }
}
