import React from 'react';
import {StyleSheet, Text, View, Button, Alert} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './telas/Home';
import Login from './telas/Login';
import Resultado from './telas/Resultado';
import Cam from './telas/Camera';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Resultado" component={Resultado} />
        <Stack.Screen name="Cam" component={Cam} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}