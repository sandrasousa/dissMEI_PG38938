import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, AsyncStorage, Keyboard } from 'react-native';
//import {  Loading } from '../common/Loading';
//import deviceStorage from '../services/deviceStorage'; 
import Profile from '../screens/profile';

import axios from "axios";
const API_URL = "http://192.168.1.12:4000/api/auth/";


export default class Form extends Component {
    constructor(props){        
        super(props);
        this.loginUser = this.loginUser.bind(this);

      this.state={            
        username:'',
        password: '',
        error: '',
        loading: false
      }
    }
      
    loginUser = async() => {
        const { username, password } = this.state;

        this.setState({
            message: "",
            loading: true
          });
        
        if (username !== password) {
        return axios
        .post(API_URL + "signin",{
            username,
            password
        })
        .then(response => {
            if (response.data.accessToken) {
              AsyncStorage.setItem("user", JSON.stringify(response.data));
            }
    
            return response.data;
      });
    } else {
        this.setState({
          loading: false
        });
      }
    }

       
/*OUTRO
      saveData =async()=>{
        const {username,password} = this.state;

        //save data with asyncstorage
        let user={
            username: username,
            password: password
        }

        if(this.props.type !== 'Login')
        {
            AsyncStorage.setItem('user', JSON.stringify(user));

            Keyboard.dismiss();
            alert("You successfully registered. username: " + username + ' password: ' + password);
            this.login();
        }
        else if(this.props.type == 'Login')
        {
            try{
                let user = await AsyncStorage.getItem('user');
                let ld = JSON.parse(user);

                if (ld.username != null && ld.password != null)
                {
                    if (ld.username == username && ld.password == password)
                    {
                        alert('Go in!');
                    }
                    else
                    {
                        alert('username and Password does not exist!');
                    }
                }

            }catch(error)
            {
                alert(error);
            }
        }
}

showData = async()=>{
    let user = await AsyncStorage.getItem('user');
    let ld = JSON.parse(user);
    alert('username: '+ ld.username + ' ' + 'password: ' + ld.password);
} */

render() {
    const { username, password, loading } = this.state;

    return(
       
        <View style={styles.container}>
            <TextInput style={styles.inputBox}
            value={username}
            onChangeText={username => this.setState({ username })}
            underlineColorAndroid='rgba(0,0,0,0)' 
            placeholder="Username"
            placeholderTextColor = "#002f6c"
            selectionColor="#fff"
            onSubmitEditing={()=> this.password.focus()}/>
            
            <TextInput style={styles.inputBox}
            value={password}
            onChangeText={password => this.setState({ password })}
            underlineColorAndroid='rgba(0,0,0,0)' 
            placeholder="Password"
            secureTextEntry={true}
            placeholderTextColor = "#002f6c"
            ref={(input) => this.password = input}
            />

            {!loading ?
            <TouchableOpacity style={styles.button}> 
                <Text style={styles.buttonText} onPress={this.loginUser}>{this.props.type}</Text>
            </TouchableOpacity>
            :
            <Profile size={'large'} />}

            
        </View>
        
    )
}

 }

 const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputBox: {
        width: 300,
        backgroundColor: '#eeeeee', 
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#002f6c',
        marginVertical: 10
    },
    button: {
        width: 300,
        backgroundColor: '#4f83cc',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 12
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
    }
});