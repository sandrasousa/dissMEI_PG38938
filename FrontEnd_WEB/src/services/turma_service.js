import axios from "axios";
import authHeader from './auth_header';

const API_URL = 'http://192.168.1.7:4000/api/turmas';

class TurmaDataService {
  getAll() {
    return axios.get(API_URL,{ headers: authHeader() });
  }

  get(id) {
    return axios.get(API_URL + `/${id}`, { headers: authHeader() });
  }
  
  create(data) {
    return axios.post(API_URL + '/add', data, { headers: authHeader() });
  }

  update(id, data) {
    return axios.put(API_URL + `/update/${id}`, data, { headers: authHeader() });
  }

  delete(id) {
    return axios.delete(API_URL +  `/delete/${id}`, { headers: authHeader() });
  }

  findByAno(ano) {
    return axios.get(API_URL + `/?ano=${ano}`, { headers: authHeader() });
  }

  findByTurmaCriancas(id) {
    return axios.get(API_URL + `/criancas/${id}`, { headers: authHeader() });
  }

  findByAnoCriancas(ano) {
    return axios.get(API_URL + `/criancas?ano=${ano}`, { headers: authHeader() });
  }

  findByTurmaUsers(id) {
    return axios.get(API_URL + `/users/${id}`, { headers: authHeader() });
  }

}

export default new TurmaDataService();