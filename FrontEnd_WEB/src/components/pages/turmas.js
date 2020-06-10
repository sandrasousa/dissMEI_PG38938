import React, { Component } from "react";
import { Link } from "react-router-dom";

import TurmaDataService from "../../services/turma_service";

import "../../style/board_admin.css";

export default class Turma extends Component {
  constructor(props) {
    super(props);
    
    this.onChangeSearchAno = this.onChangeSearchAno.bind(this);
    this.retrieveTurmas = this.retrieveTurmas.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTurma = this.setActiveTurma.bind(this);
    this.searchAno = this.searchAno.bind(this);
    
    this.onChangeAno = this.onChangeAno.bind(this);
    this.onChangeClasse = this.onChangeClasse.bind(this);
    this.saveTurma = this.saveTurma.bind(this);
    this.newTurma = this.newTurma.bind(this);

    this.state = {
      turmas: [],
      currentTurma: null,
      currentIndex: -1,
      searchAno: "",

      id: null,
      ano: "",
      classe: "",
      users: [""]
    };
  }

  componentDidMount() {
    this.retrieveTurmas();
  }

  //LISTAR TURMAS
  onChangeSearchAno(e) {
    const searchAno = e.target.value;

    this.setState({
      searchAno: searchAno
    });
  }

  retrieveTurmas() {
    TurmaDataService.getAll()
      .then(response => {
        this.setState({
          turmas: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveTurmas();
    this.setState({
      currentTurma: null,
      currentIndex: -1
    });
  }

  setActiveTurma(turma, index) {
    this.setState({
      currentTurma: turma,
      currentIndex: index
    });
  }

  searchAno() {
    TurmaDataService.findByAno(this.state.searchAno)
      .then(response => {
        this.setState({
          turmas: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  //ADICIONAR TURMAS
  onChangeAno(e) {
    this.setState({
      ano: e.target.value
    });
  }

  onChangeClasse(e) {
    this.setState({
      classe: e.target.value
    });
  }

  //ADICIONAR TURMAS
  saveTurma() {
    var data = {
      ano: this.state.ano,
      classe: this.state.classe
    };

    TurmaDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          ano: response.data.ano,
          classe: response.data.classe
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newTurma() {
    this.setState({
      id: null,
      ano: "",
      classe: ""
    });
  }

  render() {
    const { searchAno, turmas, currentTurma, currentIndex } = this.state;
    return (
      <div className="container">
        <header className="header">
          <p>TURMAS</p>
          </header>

        <div className="container">
        <div className="search">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Procurar por Ano"
                value={searchAno}
                onChange={this.onChangeSearchAno}
              />
              <div className="input-group-append">
                <button
                  className="btn"
                  type="button"
                  onClick={this.searchAno}
                >
                  Procurar
                </button>
              </div>
            </div>
          </div>
          </div>
        
        <br/><br/><br/>
        <hr/>
        <div className="container">
        <div className="List">
          <div className="turmas">
            <h5>Listas de Turmas</h5>
            <br/>           
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Ano</th>
                  <th>Classe</th>
                  <th>Responsavel</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {turmas &&
                  turmas.map((turma, index) => (
                <tr key={turma.id}>
                  <td> <Link to={"/turma/criancas/" + turma.id}> {turma.id} </Link> </td> 
                  <td className={
                        " " +
                        (index === currentIndex ? "" : "")
                      }
                      onClick={() => this.setActiveTurma(turma, index)}
                      key={index}>{turma.ano}</td>
                  <td>{turma.classe}</td>
                  <td></td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="col-md-6">
            {currentTurma ? (
              <div>
                <h4>Turma</h4>
                <div>
                  <label>
                    <strong>Ano:</strong>
                  </label>{" "}
                  {currentTurma.ano}
                </div>
                <div>
                  <label>
                    <strong>Classe:</strong>
                  </label>{" "}
                  {currentTurma.classe}
                </div>
                
                <Link
                  to={"/turma/" + currentTurma.id}
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
        </div>
        </div>

        <br/>
        <hr/>
        
          <div className="submit-form">
          {this.state.submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <button className="btn" onClick={this.newTurma}>
                Add
              </button>
            </div>
          ) : (
            <div className="col-md-12">
              <h4>Adicionar Nova Turma</h4>
              <br/>
            <div className="form">
              <div className="form-group">
                <label htmlFor="title"><b>Ano</b></label>
                <input
                  type="text"
                  className="form-control"
                  id="ano"
                  required
                  value={this.state.ano}
                  onChange={this.onChangeAno}
                  name="ano"
                />
              </div>

              <div className="form-group">
                <label htmlFor="description"><b>Classe</b></label>
                <input
                  type="text"
                  className="form-control"
                  id="classe"
                  required
                  value={this.state.classe}
                  onChange={this.onChangeClasse}
                  name="classe"
                />
              </div>

              <button onClick={this.saveTurma} className="btn">
                Adicionar
              </button>
            </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}