import React, { Component } from "react";

import { Link } from "react-router-dom";

import { Container } from 'reactstrap';

import UserService from "../services/user_service";
import AuthService from "../services/auth_service";

export default class BoardResponsavel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      currentUser: AuthService.getCurrentUser(),
      criancas:[]
    };
  }

  componentDidMount() {
    UserService.getResponsavelBoard().then(
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
      <div className="container">
        <header className="header">
          <p>{this.state.content}</p>
        </header>

        <strong>Os seus encarregados:</strong>
        <br></br>
        <ul>
          {currentUser.criancas &&
            currentUser.criancas.map((crianca, index) => <li key={index}><Link to={{pathname: '/criancas/?nome=' + crianca}}>{crianca}</Link></li>)}
        </ul>
      </div>
    );
  }
}