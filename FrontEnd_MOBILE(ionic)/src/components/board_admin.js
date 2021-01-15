import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container } from 'reactstrap';

import UserService from "../services/user_service";
import TurmaDataService from "../services/turma_service";

import "../style/board_admin.css";

export default class BoardAdmin extends Component {
  constructor(props) {
    super(props);
    

    this.state = {
      content: ""
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
  }

  render() {

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
            <Link to='/users'>Ver Utilizadores</Link>
            </div>
        </div>
      </Container>
    );
  }
}