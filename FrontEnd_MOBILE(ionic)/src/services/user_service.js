import axios from 'axios';
import authHeader from './auth_header';

const API_URL = 'http://localhost:4000/api';

class UserService {

  getPublicContent() {
    return axios.get(API_URL + '/all');
  }

  getAdminBoard() {
    return axios.get(API_URL + '/admin', { headers: authHeader() });
  }

  getEducacaoBoard() {
    return axios.get(API_URL + '/educacao', { headers: authHeader() });
  }

  getResponsavelBoard() {
    return axios.get(API_URL + '/responsavel', { headers: authHeader() });
  }

}

export default new UserService();