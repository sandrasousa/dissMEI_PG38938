import { AsyncStorage } from 'react-native';
import axios from "axios";

const API_URL = "http://192.168.1.8:4000/api/auth/";

const deviceStorage = {
  async login(username, password) {
    try {
      await axios
      .post(API_URL + "signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          AsyncStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
    }
  },

  async getCurrentUser() {
    try {
      return JSON.parse(await AsyncStorage.getItem('user'));
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
    }
  },

  async loadJWT() {
    try {
      const value = await AsyncStorage.getItem('id_token');
      if (value !== null) {
        this.setState({
          jwt: value,
          loading: false
        });
      } else {
        this.setState({
          loading: false
        });
      }
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
    }
  },

  async deleteJWT() {
    try{
      await AsyncStorage.removeItem('id_token')
      .then(
        () => {
          this.setState({
            jwt: ''
          })
        }
      );
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
    }
  }
};

export default deviceStorage;