import React, { useState, useEffect } from "react";
import { SafeAreaView, View, StyleSheet, TouchableOpacity, Image, Text, TextInput ,Button, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
export let resultado;


export default function Cam({ navigation }) {

  const [preview, setPreview] = useState("");
  const [Bio, setBio] = useState(false);
  const [upload, setUpload] = useState(null);
  const ButtonAlert = () =>
  Alert.alert(
    "Alert Title",
    "My Alert Msg",
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "OK", onPress: () => console.log("OK Pressed") }
    ],
    { cancelable: false }
  );

  function handleSelectTypeImage() {
    setBio(true);
  }

  async function UploadImage() {
    setBio(false);
    var data = new FormData();
    data.append("image", upload);

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        
        resultado= JSON.parse(this.responseText);
        navigation.navigate('Resultado');
      }
    });

    xhr.open("POST", "http://plantai.pagekite.me/");

    xhr.send(data);
  }


  async function handleSelectCamera() {

    
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      resizeMode: '',
      aspect: [1, 1],

    })
    if (result.cancelled) {
      console.log("Error")
    } else {
      setBio(true);
      let prefix;
      let ext;
      if (result.fileName) {
        [prefix, ext] = result.fileName;
        ext = ext.toLowerCase() === 'heic' ? 'jpg' : ext;
      } else {
        prefix = new Date().getTime();
        ext = 'jpg'
      }

      const imageUpload = {
        uri: result.uri,
        type: 'image/jpg',
        name: `${prefix}.${ext}`
      }
      setUpload(imageUpload);
      setPreview(result.uri);
    }

  }


  async function handleSelectGalery() {
    
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,

      allowsEditing: true,
      aspect: [1, 1],

    });
    
    if (result.cancelled) {
      console.log("Error")
    } else {
      setBio(true);
      let prefix;
      let ext;
      if (result.fileName) {
        [prefix, ext] = result.fileName;
        ext = ext.toLowerCase() === 'heic' ? 'jpg' : ext;
      } else {
        prefix = new Date().getTime();
        ext = 'jpg'
      }
      const imageUpload = {
        uri: result.uri,
        type: 'image/jpg',
        name: `${prefix}.${ext}`
      }
      setUpload(imageUpload);
      setPreview(result.uri);
    }
  }

  return (
    <SafeAreaView style={styles.back}>


      <View style={{
        marginTop: 70,
        justifyContent: "center",
        alignItems: "center",
        width: 256,
        height: 256,
        borderWidth: preview ? 0 : 1,
        borderStyle: "dashed",
        borderColor: "#777",
        borderRadius: 7,
        resizeMode: 'contain',
      }}>
        <TouchableOpacity
          style={styles.button}
          
        >
          
            
          
          {preview.length > 0 ? (
            <Image style={styles.image} source={{
              uri: preview
            }} />
          ) :
            (<Text style={{
              color:'#777',


            }}>
              Sua imagem aparecerá aqui</Text>)}
        
        </TouchableOpacity>

        
      </View>
      <Text style={styles.bioLabel}>Escolha a imagem da sua planta</Text> 

      <View style={styles.containerType}>
              <TouchableOpacity onPress={handleSelectGalery} >
                <Text style={styles.textButton}>Selecionar da galeria</Text>
              </TouchableOpacity>
              </View>
              
              <View style={styles.containerType}>
              <TouchableOpacity onPress={() => handleSelectTypeImage()} onPress={handleSelectCamera}>
                <Text style={styles.textButton}>Abrir câmera</Text>
              </TouchableOpacity>
            </View>
        {Bio && (    
      <TouchableOpacity onPress={UploadImage} style={styles.bioButton}>
        <Text style={styles.Label} >Avançar</Text>
      </TouchableOpacity>
)}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  back: {
    backgroundColor: '#fff',
    height: "100%",
    width: "100%",
    resizeMode: "cover",
    alignItems: "center",
    
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
    borderRadius: 7, 
    marginBottom:20
  },
  containerType: {
    width: 230,
    height: 50,
    backgroundColor: "#11A956",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginVertical:10,
    
    
  },
    
    
  
  textButton: {
    alignItems:'center',
    justifyContent:'center',
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 2
  },
  button: {
    width: "100%",
    height: "100%",
    borderRadius:8,
    backgroundColor: '#f2f2f2',
    tintColor:'black',
    justifyContent: "center",
    alignItems: "center",
    
  },
  

  bioLabel: {
    color: "#000",
    fontSize: 18,
    textAlign: "center",
    marginVertical:20,
    
  },
  Label: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },

  bioButton: {
    height: 50,
    width: 300,
    borderWidth: 0.3,
    borderColor: "#fff",
    borderRadius: 5,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    backgroundColor: "#F7A22B"
  }
});

