import 'react-native-gesture-handler';

import * as React from 'react';
import { Button, View, Text, AsyncStorage } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './src/screens/login';
import ProfileScreen from './src/screens/profile';

const Stack = createStackNavigator();

const getCurrentUser = async() => {
  return JSON.parse(AsyncStorage.getItem('user'));;
}


const App = () => {
  return (
    <NavigationContainer>
      
      {getCurrentUser? (
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              title: 'Login', //Set Header Title
              headerStyle: {
                backgroundColor: '#f4511e', //Set Header color
              },
              headerTintColor: '#fff', //Set Header text color
              headerTitleStyle: {
                fontWeight: 'bold', //Set Header text style
              },
            }}
        />
      </Stack.Navigator> 
    ) : (
      <Stack.Navigator>
        <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'ProfileScreen', //Set Header Title
          headerStyle: {
            backgroundColor: '#f4511e', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
     </Stack.Navigator>
    )}
     
    </NavigationContainer>
  );
};

export default App;