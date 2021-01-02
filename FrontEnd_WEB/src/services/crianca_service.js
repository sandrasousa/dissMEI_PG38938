import axios from "axios";
import authHeader from './auth_header';

const API_URL = 'http://192.168.1.6:4000/api/criancas';

class CriancaDataService {
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

  findByNome(nome) {
    return axios.get(API_URL + `/?nome=${nome}`, { headers: authHeader() });
  }
  
}

export default new CriancaDataService();