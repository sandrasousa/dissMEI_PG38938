import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "../services/auth_service";

import "../style/login.css";

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
        <hr/>
        <p>
          <strong>Email: </strong>{" "}
          {currentUser.email}
        </p>

        {currentUser.dataNascimento ? (
          <p>
            <strong>Data de Nascimento: </strong>
            {currentUser.dataNascimento}
          </p>
        ) : (
          <p></p>
        )}

        {currentUser.sexo ? (
          <p>
            <strong>Sexo: </strong>
            {currentUser.sexo}
          </p>
        ) : (
          <p></p>
        )}
        
        {currentUser.morada ? (
          <p>
            <strong>Morada: </strong>
            {currentUser.morada}
          </p>
        ) : (
          <p></p>
        )}

        {currentUser.contacto ? (
          <p>
            <strong>Contacto: </strong>
            {currentUser.contacto}
          </p>
        ) : (
          <p></p>
        )}

        <div align="right">
          <button className="btn">
            <Link to={"user/" + currentUser.id}>Editar</Link>
          </button>
        </div>

        <hr/>

        <strong>Cargos:</strong>
        <ul>
          {currentUser.roles &&
            currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
        </ul>

      </div>
    );
  }
}