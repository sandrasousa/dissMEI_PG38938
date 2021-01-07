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

    //this.retriveIncidentes = this.retriveIncidentes.bind(this);

    this.getAllCriancas = this.getAllCriancas.bind(this);

    this.state = {
      id: null,
      descricao: "",
      data: "",
      comentario: "",
      anexo: "",
      criancaId: "",

      users: [""],
      incidentes: [],
      criancas:[]
    };
  }

  componentDidMount() {
    this.getAllCriancas();
    //this.retriveIncidentes(this.props.match.params.id);
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
          descricao: response.data.descricao,
          data: response.data.data,
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
      descricao: "",
      data: "",
      comentario: "",
      anexo: "",
      criancaId: ""
    });
  }

/*  retriveIncidentes(id) {
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
  } */

  getAllCriancas() {
    CriancaDataService.getAll()
    .then(response => {
      this.setState({
        criancas: response.data
      });
      console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });
}


  refreshList() {
    this.getAllCriancas();
  }

  render() {
    const { criancas } = this.state;

    return (
      <div className="container">
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
                type="text"
                className="form-control"
                id="anexo"
                
                value={this.state.anexo}
                onChange={this.onChangeAnexo}
                name="anexo"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description"><b>Crianca</b></label>
              
                <select >
                    {criancas.map((crianca) => (
                    <option type="submit"
                      className="form-control" 
                      id="criancaId" 
                      key={crianca.id}
                      name="criancaId"
                      value={this.state.criancaId} 
                      onChange={this.onChangeCriancaID}>{crianca.nome} {crianca.apelido}</option>
                 ))}
                </select>  
         
              </div>

            <button onClick={this.saveIncidente} className="btn">
              Adicionar
            </button>
          </div>
          </div>
      </div>
    );
  }
}