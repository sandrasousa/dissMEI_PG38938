import React, { Component } from "react";
import AuthService from "../services/auth_service";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: AuthService.getCurrentUser()
    };
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div className="container">
        <header className="header">
          <h4> Bem Vindo! <br/>
            <strong>{currentUser.nome} {currentUser.apelido}</strong>
          </h4>
        </header>

        <p>
          <strong>Email:</strong>{" "}
          {currentUser.email}
        </p>
        <strong>Authorities:</strong>
        <ul>
          {currentUser.roles &&
            currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
        </ul>
        <ul>
          {currentUser.criancas &&
            currentUser.criancas.map((crianca, index) => <li key={index}>{crianca}</li>)}
        </ul>
        <ul>
          {currentUser.turmas &&
            currentUser.turmas.map((turma, index) => <li key={index}>{turma}</li>)}
        </ul>

      </div>
    );
  }
}