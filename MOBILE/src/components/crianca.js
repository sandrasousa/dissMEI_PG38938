import React, { Component, Fragment } from 'react';
import { View, Text } from 'react-native';
import { Input, TextLink, Loading, Button } from '../style';
import axios from 'axios';
import deviceStorage from '../services/deviceStorage ';

class Crianca extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      error: '',
      loading: false,
      criancas: []
    };
    this.getCrianca = this.getCrianca.bind(this);
  }

  componentDidMount() {
    this.getCrianca(this.props.match.params.id);
  }

  getCrianca() {
    axios.get("http://localhost:4000/api/criancas", {
        method: 'GET'
    })
      .then(response => {
        this.setState({
          criancas: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { username, password, error, loading, criancas } = this.state;
    const { form, section, errorTextStyle } = styles;

    return (
     <View>
         <Text>{criancas.nome}</Text>
     </View>
    );
  }
}

const styles = {
  form: {
    width: '100%',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  section: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    backgroundColor: '#fff',
    borderColor: '#ddd',
  },
  errorTextStyle: {
    alignSelf: 'center',
    fontSize: 18,
    color: 'red'
  }
};

export { Crianca };