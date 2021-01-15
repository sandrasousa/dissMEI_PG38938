import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button, Loading } from '../style';
import axios from 'axios';
import deviceStorage from '../services/deviceStorage ';

export default class LoggedIn extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      email: '',
      error: '',
      content: "",
      currentUser: deviceStorage.getCurrentUser(),
    }
  }

  componentDidMount(){
    UserService.getResponsavelBoard().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    const { currentUser } = this.state;


      return(
        <View style={container}>
          <Text>{this.state.content}</Text>
        </View>
      )
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  emailText: {
    alignSelf: 'center',
    color: 'black',
    fontSize: 20
  },
  errorText: {
    alignSelf: 'center',
    fontSize: 18,
    color: 'red'
  }
};