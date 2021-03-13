import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert} from 'react-native';

export default function Login({ navigation }) {
 
  return (
    <View style={styles.container}>
      
      <Image
      source={require('../assets/logo.png')}
      style={styles.logo}
      />

<TextInput
      style={styles.input}
      placeholder= "digite seu email"
      />
      <TextInput
      style={styles.input2}
      secureTextEntry = {true}
      placeholder= "digite sua senha"
    />
      <TouchableOpacity onPress={() => navigation.navigate('Cam')}
        style={styles.botao}
        
      >
        <Text style ={styles.botaoText}>Login</Text>
      </TouchableOpacity>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 100,
    marginTop: 140,
    marginBottom:50

  },
  input: {
    marginTop: 10,
    padding: 10,
    width: 300,
    backgroundColor: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    borderRadius: 3
  },
  input2: {
    marginTop: 10,
    padding: 10,
    width: 300,
    backgroundColor: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    borderRadius: 3
  },
  botao: {
    width: 300,
    height: 42,
    backgroundColor :'#80C783',
    marginTop: 10,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  botaoText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff'
  },

 
});
