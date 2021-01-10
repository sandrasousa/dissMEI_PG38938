import React, { Component } from "react";

import TurmaDataService from "../../services/turma_service";

import "../../style/board_admin.css";

export default class Turma extends Component {
  constructor(props) {
    super(props);

    this.onChangeAno = this.onChangeAno.bind(this);
    this.onChangeClasse = this.onChangeClasse.bind(this);
    this.getTurma = this.getTurma.bind(this);
    this.updateTurma = this.updateTurma.bind(this);
    this.deleteTurma = this.deleteTurma.bind(this);

    this.state = {
      currentTurma: {
        id: null,
        ano: "",
        classe: ""
      }, 
      message: ""
    };
  }

  componentDidMount() {
    this.getTurma(this.props.match.params.id);
  }

  onChangeAno(e) {
    const ano = e.target.value;

    this.setState(function(prevState) {
      return {
        currentTurma: {
          ...prevState.currentTurma,
          ano: ano
        }
      };
    });
  }

  onChangeClasse(e) {
    const classe = e.target.value;
    
    this.setState(prevState => ({
      currentTurma: {
        ...prevState.currentTurma,
        classe: classe
      }
    }));
  }

  getTurma(id) {
    TurmaDataService.get(id)
      .then(response => {
        this.setState({
          currentTurma: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateTurma() {
    TurmaDataService.update(
      this.state.currentTurma.id,
      this.state.currentTurma
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

  deleteTurma() {    
    TurmaDataService.delete(this.state.currentTurma.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/turmas')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentTurma } = this.state;

    return (
      <div className="col-md-12">
        {currentTurma ? (
          <div className="form">
            <h4>Turma</h4>
            <form>
              <div className="form-group">
                <label htmlFor="ano">Ano</label>
                <input
                  type="text"
                  className="form-control"
                  id="ano"
                  value={currentTurma.ano}
                  onChange={this.onChangeAno}
                />
              </div>
              <div className="form-group">
                <label htmlFor="classe">Classe</label>
                <input
                  type="text"
                  className="form-control"
                  id="classe"
                  value={currentTurma.classe}
                  onChange={this.onChangeClasse}
                />
              </div>
            </form>

            <button
              type="submit"
              className="btn-update"
              onClick={this.updateTurma}
            >
              Atualizar
            </button>

            <button
              className="btn-delete"
              onClick={this.deleteTurma}
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
    );
  }
}
