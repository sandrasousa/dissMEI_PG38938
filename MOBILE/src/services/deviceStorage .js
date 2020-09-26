import axios from "axios";
import { AsyncStorage } from 'react-native';

const API_URL = "http://192.168.1.12:4000/api/auth/";

class AuthService {
    async login(username, password) {

        return axios
      .post(API_URL + "signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          await AsyncStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
    }
} 

export default new AuthService();