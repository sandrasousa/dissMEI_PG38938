import React, { Component } from "react";
//import { Link } from "react-router-dom";

import MedicoDataService from "../../services/medico_service";
import CriancaDataService from "../../services/crianca_service";

import "../../style/board_admin.css";

export default class Medico extends Component {
  constructor(props) {
    super(props);
          
    this.onChangeTipoSanguineo = this.onChangeTipoSanguineo.bind(this);
    this.onChangeAlergia = this.onChangeAlergia.bind(this);
    this.onChangeDoenca = this.onChangeDoenca.bind(this);
    this.onChangeLesao = this.onChangeLesao.bind(this);
    this.onChangeComentario = this.onChangeComentario.bind(this);
    this.onChangeAnexo = this.onChangeAnexo.bind(this);
    this.onChangeCriancaID = this.onChangeCriancaID.bind(this);

    this.saveIncidente = this.saveIncidente.bind(this);
    this.newIncidente = this.newIncidente.bind(this);

    this.retriveMedico = this.retriveMedico.bind(this);

    this.state = {
      currentCrianca:[],
      
      id: null,
      tipoSanguineo: "",
      alergia: "",
      doenca: "",
      lesao: "",
      comentario: "",
      anexo: "",
      criancaId: "",
      users: [""],
      medicos: [],
      
    };
  }

  componentDidMount() {
    this.getCriancaID(this.props.match.params.id);
    this.retriveMedico(this.props.match.params.id);
  }

  //ADICIONAR Incidente
  onChangeTipoSanguineo(e) {
    this.setState({
      tipoSanguineo: e.target.value
    });
  }

  onChangeAlergia(e) {
    this.setState({
      alergia: e.target.value
    });
  }

  onChangeDoenca(e) {
    this.setState({
      doenca: e.target.value
    });
  }

  onChangeLesao(e) {
    this.setState({
      lesao: e.target.value
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

    MedicoDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          tipoSanguineo: response.data.tipoSanguineo,
          alergia: response.data.alergia,
          doenca: response.data.doenca,
          lesao: response.data.lesao,
          comentario: response.data.comentario,          
          anexo: response.data.anexo,
          criancaId: response.data.criancaId
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
      tipoSanguineo: "",
      alergia: "",
      doenca: "",
      lesao: "",
      comentario: "",
      anexo: "",
      criancaId: "",
    });
  }

  retriveMedico(id) {
    MedicoDataService.getCrianca(id)
      .then(response => {
        this.setState({
          medicos: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  getCriancaID(id) {
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
    this.getCriancaID();
  }

  render() {
    const { currentCrianca, medicos } = this.state;

    return (
      <div className="container">
        <header className="header">
          <p>Perfil Médico</p>
          </header>

          {currentCrianca ? (
              <div className="container">
                   <p>{medicos.criancaId}</p>
                {medicos ? (
                 
                    <table>
                        <thead>
                            <tr>
                                <th>Descrição</th>
                                <th>Data</th>
                                <th>Data</th>
                                <th>Data</th>
                                <th>Comentário(s)</th>
                            </tr>
                        </thead>
                        <tbody>
                     {medicos && medicos.map((medico, index) => ( 
                        <tr key={medico.id}>
                          <td>{medico.tipoSanguineo}</td>
                        <td>{medico.alergia}</td>
                        <td>{medico.doenca}</td>
                        <td>{medico.lesao}</td>
                     <td>{medico.comentario}</td>
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
                <label htmlFor="title"><b>Descrição</b></label>
                <input
                  type="text"
                  className="form-control"
                  id="descricao"
                  required
                  value={this.state.tipoSanguineo}
                  onChange={this.onChangeTipoSanguineo}
                  name="descricao"
                />
              </div>

              <div className="form-group">
                <label htmlFor="title"><b>Data</b></label>
                <input
                  type="text"
                  className="form-control"
                  id="data"
                  value={this.state.alergia}
                  onChange={this.onChangeAlergia}
                  name="data"
                />
              </div>

              <div className="form-group">
                <label htmlFor="title"><b>Data</b></label>
                <input
                  type="text"
                  className="form-control"
                  id="data"
                  value={this.state.doenca}
                  onChange={this.onChangeDoenca}
                  name="data"
                />
              </div>

              <div className="form-group">
                <label htmlFor="title"><b>Data</b></label>
                <input
                  type="text"
                  className="form-control"
                  id="data"
                  value={this.state.lesao}
                  onChange={this.onChangeLesao}
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

              <div className="select-container">
              <label htmlFor="description"><b>Crianca</b></label>
                <select className="form-control" value={this.state.criancaId} onChange={this.onChangeCriancaID}>
                    <option type="submit"
                      id="criancaId" 
                      key={currentCrianca}
                      name="criancaId"
                      value={currentCrianca.id}>{currentCrianca.nome} {currentCrianca.apelido}</option>
                </select>  
              </div>

              <br/>
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