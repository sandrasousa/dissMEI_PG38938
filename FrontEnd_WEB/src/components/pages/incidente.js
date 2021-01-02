import React, { Component } from "react";
//import { Link } from "react-router-dom";

import IncidenteDataService from "../../services/incidente_service";
import CriancaDataService from "../../services/crianca_service";

import "../../style/board_admin.css";

export default class Incidente extends Component {
  constructor(props) {
    super(props);
          
    this.onChangeDescricao = this.onChangeDescricao.bind(this);
    this.onChangeData = this.onChangeData.bind(this);
    this.onChangeComentario = this.onChangeComentario.bind(this);
    this.onChangeAnexo = this.onChangeAnexo.bind(this);
    this.onChangeCriancaID = this.onChangeCriancaID.bind(this);
    this.saveIncidente = this.saveIncidente.bind(this);
    this.newIncidente = this.newIncidente.bind(this);

    this.retriveIncidentes = this.retriveIncidentes.bind(this);

    this.state = {
      id: null,
      descricao: "",
      data: "",
      comentario: "",
      anexo: "",
      criancaId: "",
      users: [""],
      incidentes: []
    };
  }

  componentDidMount() {
    this.getCrianca(this.props.match.params.id);
    this.retriveIncidentes(this.props.match.params.id);
  }

  //ADICIONAR Incidente
  onChangeDescricao(e) {
    this.setState({
        descricao: e.target.value
    });
  }

  onChangeData(e) {
    this.setState({
        data: e.target.value
    });
  }

  onChangeComentario(e) {
    this.setState({
        comentario: e.target.value
    });
  }

  onChangeAnexo(e) {
    this.setState({
        anexo: e.target.value
    });
  }

  onChangeCriancaID(e) {
    this.setState({
        criancaId: e.target.value
    });
  }

  //ADICIONAR Incidentes
  saveIncidente() {
    var data = {
      descricao: this.state.descricao,
      data: this.state.data,
      comentario: this.state.comentario,
      anexo: this.state.anexo,
      criancaId: this.state.criancaId
    };

    IncidenteDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          descricao: response.descricao,
          data: response.data,
          comentario: response.comentario,
          anexo: response.anexo,
          criancaId: response.criancaId
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newIncidente() {
    this.setState({
      id: null,
      descricao: "",
      data: "",
      comentario: "",
      anexo: "",
      criancaId: ""
    });
  }

  retriveIncidentes(id) {
    IncidenteDataService.getCrianca(id)
      .then(response => {
        this.setState({
          incidentes: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
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

  refreshList() {
    this.setState({
      currentCrianca: null,
      currentIndex: -1
    });
  }

  render() {
    const { currentCrianca, incidentes } = this.state;

    return (
      <div className="container">
        <header className="header">
          <p>Registo de Incidentes</p>
          </header>

          {currentCrianca ? (
              <div className="container">

                {incidentes ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Descrição</th>
                                <th>Data</th>
                                <th>Comentário(s)</th>
                            </tr>
                        </thead>
                        <tbody>
                     {incidentes && incidentes.map((incidente, index) => ( 
                        <tr key={incidente.id}>
                          <td>{incidente.descricao}</td>
                        <td>{incidente.data}</td>
                     <td>{incidente.comentario}</td>
                        </tr>
                        )
                    )}
                     </tbody>
                   </table>
                ) : (
                <p>Sem incidentes registados</p>
            )} 
              

          <div className="submit-form">
          {this.state.submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <button className="btn" onClick={this.newIncidente}>
                Add
              </button>
            </div>
          ) : (
            <div className="col-md-12">
              <h4>Registar Incidente</h4>
              <br/>
            <div className="form">
              
              <div className="form-group">
                <label htmlFor="title"><b>Criança</b></label>
                <select className="form-control">
                    <option
                        type="submit"
                        hidden
                        id="criancaId"
                        required
                        value={this.state.criancaId}
                        onChange={this.onChangeCriancaID}
                        name="criancaId"
                        label={`${currentCrianca.nome} ${currentCrianca.apelido}`}>{currentCrianca.id}</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="title"><b>Descrição</b></label>
                <input
                  type="text"
                  className="form-control"
                  id="descricao"
                  required
                  value={this.state.descricao}
                  onChange={this.onChangeDescricao}
                  name="descricao"
                />
              </div>

              <div className="form-group">
                <label htmlFor="description"><b>Data</b></label>
                <input
                  type="date"
                  className="form-control"
                  id="data"
                  required
                  value={this.state.data}
                  onChange={this.onChangeData}
                  name="data"
                />
              </div>

              <div className="form-group">
                <label htmlFor="description"><b>Comentário</b></label>
                <input
                  type="text"
                  className="form-control"
                  id="comentario"
                  
                  value={this.state.comentario}
                  onChange={this.onChangeComentario}
                  name="comentario"
                />
              </div>

              <div className="form-group">
                <label htmlFor="description"><b>Anexo</b></label>
                <input
                  type="file"
                  className="form-control"
                  id="anexo"
                  
                  value={this.state.anexo}
                  onChange={this.onChangeAnexo}
                  name="anexo"
                />
              </div>

              <button onClick={this.saveIncidente} className="btn">
                Adicionar
              </button>
            </div>
            </div>
          )}
        </div>
        </div>
          ) : (
              <p>Não é possivel registar</p>
          )}
      </div>
    );
  }
}