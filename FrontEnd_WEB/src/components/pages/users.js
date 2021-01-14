import React, { Component } from "react";
import { Link } from "react-router-dom";

import UserService from "../../services/user_service";

import "../../style/board_admin.css";

export default class User extends Component {
  constructor(props) {
    super(props);
    
    this.retrieveUsers = this.retrieveUsers.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveUser = this.setActiveUser.bind(this);


    this.state = {
      users: [],
      currentUser: null,
      currentIndex: -1,
    };
  }

  componentDidMount() {
    this.retrieveUsers();
  }

  retrieveUsers() {
    UserService.getAll()
      .then(response => {
        this.setState({
          users: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveUsers();
    this.setState({
      currentUser: null,
      currentIndex: -1
    });
  }

  setActiveUser(user, index) {
    this.setState({
      currentUser: user,
      currentIndex: index
    });
  }


  render() {
    const { users, currentUser, currentIndex } = this.state;
    return (
      <div className="container">
        <header className="header">
          <p>Utilizadores</p>
          </header>

          <div>
            <strong>Registar um novo utilizador</strong>
            <Link to="/register">Registar</Link>
          </div>
        
        <br/><br/><br/>
        <hr/>
        <div className="container">
        <div className="List">
          <div className="turmas">
            <h5>Listas de Utilizadores</h5>
            <br/>           
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Ano</th>
                  <th>Classe</th>
                </tr>
              </thead>
              <tbody>
                {users &&
                  users.map((user, index) => (
                <tr key={user.id}>
                  <td> <Link to={"/user/" + user.id}> Ver </Link> </td> 
                  <td className={
                        " " +
                        (index === currentIndex ? "" : "")
                      }
                      onClick={() => this.setActiveUser(user, index)}
                      key={index}>{user.username}</td>
                  <td>{user.apelido}</td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="col-md-6">
            {currentUser ? (
              <div>
                <h4>Turma</h4>
                <div>
                  <label>
                    <strong>Ano:</strong>
                  </label>{" "}
                  {currentUser.nome}
                </div>
                {currentUser.classe ? ( 
                <div>
                  <label>
                    <strong>Classe:</strong>
                  </label>{" "}
                  {currentUser.apelido}
                </div> 
                ) : (
                  <div>
                  <label><strong>Sem classe!</strong></label>
                  </div>
                )}
                
                <Link
                  to={"/user/" + currentUser.id}
                  className="btn"
                >
                Edit
                </Link>
                
              </div>
            ) : (
              <div>
                <br />
                <small><i>Clique num Utilizador para mais detalhes</i></small>
              </div>
            )}
          </div>
        </div>
        </div>
      </div>
    );
  }
}