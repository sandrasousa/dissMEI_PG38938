import React, { Component } from 'react';
import { Loading } from './src/style';
import Auth from './src/screens/Auth';
import LoggedIn from './src/screens/LoggedIn';
import deviceStorage from './src/services/deviceStorage ';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      jwt: '',
      loading: true
    }

    this.newJWT = this.newJWT.bind(this);
    this.deleteJWT = deviceStorage.deleteJWT.bind(this);
    this.loadJWT = deviceStorage.loadJWT.bind(this);
    this.loadJWT();
  }

  newJWT(jwt){
    this.setState({
      jwt: jwt
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <Loading size={'large'} />
       );
    } else if (!this.state.jwt) {
      return (
        <Auth newJWT={this.newJWT} />
      );
    } else if (this.state.jwt) {
      return (
        <LoggedIn jwt={this.state.jwt} deleteJWT={this.deleteJWT} />
      );
    }
  }
}