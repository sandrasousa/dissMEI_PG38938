import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container } from 'reactstrap';

import UserService from "../services/user_service";

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
        <header className="header">
          <p>{this.state.content}</p>
          </header>
          
          <br/> <br/>
          <Link to={"/turmas"} className="btn"> Ver Turmas </Link>


      </Container>
    );
  }
}