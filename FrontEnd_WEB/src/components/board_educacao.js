import React, { Component } from "react";
import { Link } from "react-router-dom";

import { Container } from 'reactstrap';

import UserService from "../services/user_service";
import AuthService from "../services/auth_service";

export default class BoardEducacao extends Component {
  constructor(props) {
    super(props);

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
  }

  render() {
    const { currentUser } = this.state;

    return (
    <Container>
      <div className="container">
        <header className="header">
          <p>{this.state.content}</p>
        </header>

        <strong>As suas turmas:</strong>
        <br></br>
          {currentUser.turmas &&
            currentUser.turmas.map((turma, index) => <i key={index}><Link to={{pathname: '/turma/criancas/?ano=' + turma}}>{turma}</Link></i>)}
      </div>
      </Container>
    );
  }
}