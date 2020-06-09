import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Container, Table} from 'reactstrap';

import TurmaDataService from "../services/turma_service";

import "../style/board_admin.css";

/* NESTA PAGINA ADICIONAR TURMAS É SÓ PARA ADMINISTRADOR */

class Home extends Component {
    state = {
      turmas: [],
      turma: {
          ano: ' ',
          classe: ' '
      },
      currentTurma: null
    }

    componentDidMount() {
      this.getTurmas();
    }
    
    refreshList() {
        this.retrieveTurmas();
        this.setState({
          currentTurma: null
        });
      }

    setActiveTurma(turma) {
        this.setState({
          currentTurma: turma
        });
    }

    getTurmas = _ => {
      TurmaDataService.getAll()
        .then(response => this.setState({ turmas: response.data}))
        .catch(err => console.error(err))
    }

/*    addTurma = _ => {
        const{ turma } = this.state;
        fetch(`http://localhost:4000/turmas/add?ano=${turma.ano}&turma=${turma.turma}`, {
          method: 'POST'
      })
          .then(response => response.json())
          .catch(err => console.error(err))
    } */

    render() {
      const { turmas, currentTurma, turma  } = this.state;
      return (
        <div className="App container">
            <header className="header">
                <p>TURMAS</p>
            </header>

            <Container className="lista">
                <Table  striped bordered hover>
                    <thead>
                        <tr>
                            <th> <h5> Ano </h5> </th>
                            <th> <h5> Classe </h5> </th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {turmas.map((turma) =>
                        <tr key={turma.id}>
                            <td>{turma.ano}</td>
                            <td>{turma.classe ? (turma.classe) : ('--')}</td>
                            <td key={turma.id}> <Link to={"/turmas/criancas/" + turma.id} className="btn"> Ver Crianças </Link> </td>
                        </tr>
                        )}
                    </tbody>
                </Table>
            </Container>

        </div>
          )
    }
  }

  export default Home;