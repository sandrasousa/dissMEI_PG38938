import axios from "axios";

const API_URL = 'http://localhost:4000/api/turmas';

class TurmaDataService {
  getAll() {
    return axios.get(API_URL);
  }

  get(id) {
    return axios.get(API_URL + `/${id}`);
  }
  
  create(data) {
    return axios.post(API_URL + '/add', data);
  }

  update(id, data) {
    return axios.put(API_URL + `${id}`, data);
  }

  delete(id) {
    return axios.delete(API_URL +  `${id}`);
  }

  findByAno(ano) {
    return axios.get(API_URL + `/?ano=${ano}`);
  }
}

export default new TurmaDataService();