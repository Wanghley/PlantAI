
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default function Resultado() {
  return (
    <View style={{flex: 1,backgroundColor: '#f2f2f2'}}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor: '#efefef'}}>
            <Image source={require('../assets/milho.png')} style={{flex: 0.95,width: 900,height: 900,resizeMode: 'contain'}} />

        </View>
        <View style={{flex: 2}}>
            <Text style={{ fontSize: 36, fontWeight: 'bold' }}>Zea mays everta</Text>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>(milho de pipoca)</Text>
            <Text style={{ fontSize: 18}}>Sua planta está bem! Segundo o nosso diagnostico, sua planta está saudável e não identificamos nenhum tipo de praga ou doença.{"\n"}
            Para ter uma eficiencia melhor na sua plantação disponibilizamos algumas dicas:{"\n"}
            É sempre importante estar manejando a sua plantação para evitar pragas como a lagarta do cartucho (Spodoptera frugiperda).
            </Text>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity style={{backgroundColor:'#11A956',borderRadius:90, paddingVertical:15, paddingHorizontal:30}}>
                    <Text style={{fontSize: 24,color:'#f2f2f2'}}>Mais Dicas</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
