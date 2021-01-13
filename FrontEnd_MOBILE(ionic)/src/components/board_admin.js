import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container } from 'reactstrap';

import UserService from "../services/user_service";
import TurmaDataService from "../services/turma_service";

import "../style/board_admin.css";

export default class BoardAdmin extends Component {
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
      content: "",
      turmas: [],
      currentTurma: null,
      currentIndex: -1,
      searchAno: "",

      id: null,
      ano: "",
      classe: ""
    };
  }

  componentDidMount() {
    UserService.getAdminBoard().then(
      response => {
        this.setState({
          content: response.data,
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );
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
      <Container>
        <div className="container">
          <header className="header">
            <p>{this.state.content}</p>
            </header>

            <div className="container">
            <strong>Turmas:</strong>
            <br></br>
            <Link to='/turmas'>Ver Turmas</Link>
            </div>
            <br/>
            
            <div className="container">
            <strong>Alunos:</strong>
            <br></br>
            <Link to='/turmas'>Ver Turmas</Link>
            </div>
            
            <br/>
            <div className="container">
            <strong>Utilizadores:</strong>
            <br></br>
            <Link to='/turmas'>Ver Turmas</Link>
            </div>
        </div>
      </Container>
    );
  }
}