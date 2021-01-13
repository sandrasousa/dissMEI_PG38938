import axios from "axios";
import authHeader from './auth_header';

const API_URL = 'http://localhost:4000/api/pmedicos';

class MedicoDataService {
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

  getCrianca(criancaId) {
    return axios.get(API_URL + `/crianca/${criancaId}`, { headers: authHeader() });
  }
  
}

export default new MedicoDataService();