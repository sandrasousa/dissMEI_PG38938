import { AsyncStorage } from 'react-native';

export default function authHeader() {
    const user = async() => { await JSON.parse(AsyncStorage.getItem('user'));}
  
    if (user && user.accessToken) {
      // for Node.js Express back-end
      return { 'x-access-token': user.accessToken };
    } else {
      return {};
    }
  }