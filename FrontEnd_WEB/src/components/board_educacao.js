import React, { Component } from "react";
import { Link } from "react-router-dom";

import { Container } from 'reactstrap';


import UserService from "../services/user_service";
import AuthService from "../services/auth_service";
import TurmaDataService from "../services/turma_service";

export default class BoardEducacao extends Component {
  constructor(props) {
    super(props);

    this.retrieveTurmas = this.retrieveTurmas.bind(this);

    this.state = {
      content: "",
      currentUser: AuthService.getCurrentUser(),
      turmas:[]
    };
  }

  componentDidMount() {
    UserService.getEducacaoBoard().then(
      response => {
        this.setState({
          content: response.data
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
      };

  render() {
    const { currentUser, turmas } = this.state;

    return (
    <Container>
      <div className="container">
        <header className="header">
          <p>{this.state.content}</p>
        </header>

        <strong>As suas turmas:</strong>
         <ul>
          {currentUser.turmas &&
           currentUser.turmas.map((turma, index) => 
           
            <Link to={"/turma/criancas/" + turma}> <li key={index}>{turma}</li> </Link>
            
           )}
        </ul>
      </div>
      </Container>
    );
  }
}