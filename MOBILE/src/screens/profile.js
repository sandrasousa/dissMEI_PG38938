import React, { Component } from "react";

import {
  AsyncStorage,
  StyleSheet,
  Text,
  View
} from 'react-native'

const getCurrentUser = async() => {
  await AsyncStorage.getItem('user');
}

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: getCurrentUser()
    };
  }

  render() {
    const { currentUser } = this.state;

    return (
      <View style={styles.container}>
        <Text>{currentUser.nome}</Text>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 80,
    flex: 1,
    flexDirection: 'column'
  },
  button: {
    borderRadius: 4,
    padding: 20,
    textAlign: 'center',
    marginBottom: 20,
    color: '#fff'
  },
  greenButton: {
    backgroundColor: '#4CD964'
  },
  blueButton: {
    backgroundColor: '#34AADC',
  },
  centering: {
    flex: 1,
    paddingTop: 28,
    justifyContent: 'center',
    alignItems: 'center'
  }
})