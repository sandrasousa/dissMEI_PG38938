import React, { Component } from "react";

import CriancaDataService from "../../services/crianca_service";

import "../../style/board_admin.css";
import { Link } from "react-router-dom";

export default class Turma extends Component {
  constructor(props) {
    super(props);

    this.onChangeNome = this.onChangeNome.bind(this);
    this.onChangeApelido = this.onChangeApelido.bind(this);
    this.onChangeDNascimento = this.onChangeDNascimento.bind(this);
    this.onChangeSexo = this.onChangeSexo.bind(this);
    this.getCrianca = this.getCrianca.bind(this);
    this.updateCrianca = this.updateCrianca.bind(this);
    this.deleteCrianca = this.deleteCrianca.bind(this);

    this.state = {
      currentCrianca: {
        id: null,
        nome: "",
        apelido: "",
        dataNascimento: "",
        sexo: "",
      }, 
      message: ""
    };
  }

  componentDidMount() {
    this.getCrianca(this.props.match.params.id);
  }

  onChangeNome(e) {
    const nome = e.target.value;

    this.setState(function(prevState) {
      return {
        currentCrianca: {
          ...prevState.currentCrianca,
          nome: nome
        }
      };
    });
  }

  onChangeApelido(e) {
    const apelido = e.target.value;
    
    this.setState(prevState => ({
      currentCrianca: {
        ...prevState.currentCrianca,
        apelido: apelido
      }
    }));
  }

  onChangeDNascimento(e) {
    const dataNascimento = e.target.value;
    
    this.setState(prevState => ({
      currentCrianca: {
        ...prevState.currentCrianca,
        dataNascimento: dataNascimento
      }
    }));
  }

  onChangeSexo(e) {
    const sexo = e.target.value;
    
    this.setState(prevState => ({
      currentCrianca: {
        ...prevState.currentCrianca,
        sexo: sexo
      }
    }));
  }

  getCrianca(id) {
    CriancaDataService.get(id)
      .then(response => {
        this.setState({
          currentCrianca: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateCrianca() {
    CriancaDataService.update(
      this.state.currentCrianca.id,
      this.state.currentCrianca
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The Turma was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteCrianca() {    
    CriancaDataService.delete(this.state.currentCrianca.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/turmas')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentCrianca } = this.state;

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
              </tr>
            </thead>
            <tbody>
               <tr key={currentCrianca.id}>
                 <td>{currentCrianca.nome}</td>
                 <td>{currentCrianca.apelido}</td>
                 <td><label type="date">{currentCrianca.dataNascimento}</label></td>
                 <td>{currentCrianca.sexo}</td>
               </tr>
            </tbody>
          </table>
          </div>

      <Link to={'/incidente/criancas/' + currentCrianca.id} className="btn">Registar Incidente</Link>

      <div className="col-md-12">
        {currentCrianca ? (
          <div className="form">
            <form>
              <div className="form-group">
                <label htmlFor="ano">Nome</label>
                <input
                  type="text"
                  className="form-control"
                  id="nome"
                  value={currentCrianca.nome}
                  onChange={this.onChangeNome}
                />
              </div>
              <div className="form-group">
                <label htmlFor="classe">Apelido</label>
                <input
                  type="text"
                  className="form-control"
                  id="apelido"
                  value={currentCrianca.apelido}
                  onChange={this.onChangeApelido}
                />
              </div>
              <div className="form-group">
                <label htmlFor="classe">Data de Nascimento</label>
                <input
                  type="date"
                  className="form-control"
                  id="dataNascimento"
                  value={currentCrianca.dataNascimento}
                  onChange={this.onChangeDNascimento}
                />
              </div>
              <div className="form-group">
                <label htmlFor="classe">Sexo</label>

                <select className="form-control"
                  id="sexo"
                  value={currentCrianca.sexo}
                  onChange={this.onChangeSexo}>
                <option value="Feminino">Feminino</option>
                <option value="Masculino">Masculino</option>
              </select>
              </div>
            </form>

            <button
              type="submit"
              className="btn-update"
              onClick={this.updateCrianca}
            >
              Atualizar
            </button>

            <button
              className="btn-delete"
              onClick={this.deleteCrianca}
            >
              Apagar
            </button>

            
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Turma...</p>
          </div>
        )}
      </div>
      </div>
    );
  }
}
