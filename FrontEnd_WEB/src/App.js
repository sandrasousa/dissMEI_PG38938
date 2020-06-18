import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style/App.css";

import AuthService from "./services/auth_service";

import Login from "./components/login";
import Register from "./components/register";
import Home from "./components/home";
import Profile from "./components/profile";
import BoardAdmin from "./components/board_admin";
import BoardEducacao from "./components/board_educacao";
import BoardResponsavel from "./components/board_responsavel";
import Turmas from "./components/pages/turmas";
import TurmaCriancas from "./components/pages/turmaCriancas";
import EditTurma from "./components/pages/turmaEditar";
import Crianca from "./components/pages/criancas";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showEducacaoBoard: false,
      showAdminBoard: false,
      showResponsavelBoard: false,
      currentUser: undefined
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showEducacaoBoard: user.roles.includes("ROLE_EDUCACAO"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
        showResponsavelBoard: user.roles.includes("ROLE_RESPONSAVEL")
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showEducacaoBoard, showAdminBoard, showResponsavelBoard } = this.state;

    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand">
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/home"} className="nav-link">
                  Home
                </Link>
              </li>

              {showEducacaoBoard && (
                <li className="nav-item">
                  <Link to={"/educacao"} className="nav-link">
                    Educacao 
                  </Link>
                </li>
              )}

              {showAdminBoard && (
                <li className="nav-item">
                  <Link to={"/admin"} className="nav-link">
                    Admin 
                  </Link>
                </li>
              )}

              {showResponsavelBoard && (
                <li className="nav-item">
                  <Link to={"/responsavel"} className="nav-link">
                  Responsavel 
                  </Link>
                </li>
              )}

            </div>

            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    {currentUser.nome && currentUser.apelido ? (
                      <p>{currentUser.nome} {currentUser.apelido}</p>
                    ) : (
                      <p>{currentUser.username}</p>
                    )}
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={this.logOut}>
                    Logout
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    Sign Up
                  </Link>
                </li>
              </div>
            )}
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/home"]} component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={Profile} />
              <Route path="/educacao" component={BoardEducacao} />
              <Route path="/admin" component={BoardAdmin} />
              <Route path="/responsavel" component={BoardResponsavel} />
              <Route path="/turmas" component={Turmas} />
              <Route path="/turma/criancas/:id" component={TurmaCriancas} />
              <Route path="/turma/:id" component={EditTurma} />
              <Route path="/crianca/:id" component={Crianca}/>
            </Switch>
          </div>

          <div className="footer">
            <p>MEI_DISSERTAÇÃO | Sandra Sousa_PG38938</p>
          </div>

        </div>
      </Router>
    );
  }
}

export default App;