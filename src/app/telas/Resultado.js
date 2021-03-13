
import React from 'react';
import { Linking,StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView,  ScrollView} from 'react-native';

export default function Resultado() {
  let resultado= require('./Camera.js').resultado;
  function abrirLink() {
    return Linking.openURL(resultado.INFO);
  }
  if(resultado.STATUS==="success"){
  return (
    <View style={{flex: 1,backgroundColor: '#f2f2f2'}}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor: '#efefef'}}>
            <Image source={{uri: `data:image/gif;base64,${resultado.D_IMAGE}`}} style={{flex: 0.95,width: 900,height: 900,resizeMode: 'contain'}} />

        </View>
        <View style={{flex: 2}}>
            <SafeAreaView style={styles.container, {backgroundColor: '#f2f2f2'}}>
              <ScrollView style={styles.scrollView}>
                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{resultado.DIAG}</Text>
                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{resultado.SPECIE}</Text>
                <Text style={{ fontSize: 18}}>{resultado.DESC}</Text>
                <Text style={{ fontSize: 18}}>{resultado.CAUSE}</Text>
                <Text style={{ fontSize: 18}}>{resultado.TREAT}</Text>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity style={{backgroundColor:'#11A956',borderRadius:90, paddingVertical:15, paddingHorizontal:30}} onPress={abrirLink}>
                    <Text style={{fontSize: 24,color:'#f2f2f2'}}>Mais informações</Text>
                </TouchableOpacity>
                </View>
              </ScrollView>
            </SafeAreaView>
        </View>
    </View>
  );
  }
  else{
    return(
      <View style={{flex: 1,backgroundColor: '#f2f2f2'}}>
        <Text style={{ fontSize: 36, fontWeight: 'bold' }}>Não encontramos nenhum resultado possível</Text>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
