import React, { Component } from "react";
import UserDataService from "../../services/user_service";

import "../../style/board_admin.css";

export default class UserEditar extends Component {
  constructor(props) {
    super(props);
    
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeNome = this.onChangeNome.bind(this);
    this.onChangeApelido = this.onChangeApelido.bind(this);
    this.onChangeDNascimento = this.onChangeDNascimento.bind(this);
    this.onChangeSexo = this.onChangeSexo.bind(this);
    this.onChangeMorada = this.onChangeMorada.bind(this);
    this.onChangeContato = this.onChangeContato.bind(this);

    this.getUser = this.getUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);

    this.state = {
      users: [],
      currentUser: {

      id: null,
      email: "",
      password: "",
      nome: "",
      apelido: "",
      dataNascimento: "",
      sexo: "",
      morada: "",
      contacto: ""
    }, 
    message: ""
  };
  }

  componentDidMount() {
    this.getUser(this.props.match.params.id);
  }

  //ATUALIZAR/DELETE USER
  onChangeEmail(e) {
    const email = e.target.value;

    this.setState(function(prevState) {
      return {
        currentUser: {
          ...prevState.currentUser,
          email: email
        }
      };
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  onChangeNome(e) {
    const nome = e.target.value;

    this.setState(function(prevState) {
      return {
        currentUser: {
          ...prevState.currentUser,
          nome: nome
        }
      };
    });
  }

  onChangeApelido(e) {
    const apelido = e.target.value;
    
    this.setState(prevState => ({
      currentUser: {
        ...prevState.currentUser,
        apelido: apelido
      }
    }));
  }

  onChangeDNascimento(e) {
    const dataNascimento = e.target.value;
    
    this.setState(prevState => ({
      currentUser: {
        ...prevState.currentUser,
        dataNascimento: dataNascimento
      }
    }));
  }

  onChangeSexo(e) {
    const sexo = e.target.value;
    
    this.setState(prevState => ({
      currentUser: {
        ...prevState.currentUser,
        sexo: sexo
      }
    }));
  }

  onChangeMorada(e) {
    const morada = e.target.value;
    
    this.setState(prevState => ({
      currentUser: {
        ...prevState.currentUser,
        morada: morada
      }
    }));
  }

  onChangeContato(e) {
    const contacto = e.target.value;
    
    this.setState(prevState => ({
      currentUser: {
        ...prevState.currentUser,
        contacto: contacto
      }
    }));
  }

  getUser(id) {
    UserDataService.get(id)
      .then(response => {
        this.setState({
          currentUser: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateUser() {
    UserDataService.update(
      this.state.currentUser.id,
      this.state.currentUser
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The User was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteUser() {    
    UserDataService.delete(this.state.currentUser.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/profile')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
      const { currentUser } = this.state;
  
      return (
  
        <div className="container">
        <div className="List">
            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Apelido</th>
                  <th>Data de Nascimento</th>
                  <th>Sexo</th>
                  <th>Morada</th>
                  <th>Contacto</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                 <tr key={currentUser.id}>
                   <td>{currentUser.nome}</td>
                   <td>{currentUser.apelido}</td>
                   <td><label type="date">{currentUser.dataNascimento}</label></td>
                   <td>{currentUser.sexo}</td>
                   <td>{currentUser.morada}</td>
                   <td>{currentUser.contacto}</td>
                   <td>{currentUser.email}</td>
                   <td>***</td>
                   {currentUser.roles &&
                      currentUser.roles.map((role, index) => <td key={index}>{role}</td>)}
                 </tr>
              </tbody>
            </table>
            </div>
  
        <div className="col-md-12">
          {currentUser ? (
            <div className="form">
              <form>
                <div className="form-group">
                  <label htmlFor="ano">Nome</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nome"
                    value={currentUser.nome}
                    onChange={this.onChangeNome}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="classe">Apelido</label>
                  <input
                    type="text"
                    className="form-control"
                    id="apelido"
                    value={currentUser.apelido}
                    onChange={this.onChangeApelido}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="classe">Data de Nascimento</label>
                  <input
                    type="date"
                    className="form-control"
                    id="dataNascimento"
                    value={currentUser.dataNascimento}
                    onChange={this.onChangeDNascimento}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="classe">Sexo</label>
  
                  <select className="form-control"
                    id="sexo"
                    value={currentUser.sexo}
                    onChange={this.onChangeSexo}>
                  <option value="Feminino">Feminino</option>
                  <option value="Masculino">Masculino</option>
                </select>
                </div>
                <div className="form-group">
                  <label htmlFor="classe">Morada</label>
                  <input
                    type="text"
                    className="form-control"
                    id="morada"
                    value={currentUser.morada}
                    onChange={this.onChangeMorada}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="classe">Contacto</label>
                  <input
                    type="text"
                    className="form-control"
                    id="contacto"
                    value={currentUser.contacto}
                    onChange={this.onChangeContato}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="classe">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    value={currentUser.email}
                    onChange={this.onChangeEmail}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="classe">Password</label>
                  <input
                    type="text"
                    className="form-control"
                    id="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                  />
                </div>
              </form>
  
              <button
                type="submit"
                className="btn-update"
                onClick={this.updateUser}
              >
                Atualizar
              </button>
  
              <button
                className="btn-delete"
                onClick={this.deleteUser}
              >
                Apagar
              </button>
  
              
              <p>{this.state.message}</p>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a User...</p>
            </div>
          )}
        </div>
        </div>
      );
    }
  }