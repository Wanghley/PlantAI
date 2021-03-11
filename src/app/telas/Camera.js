import React, { useState, useEffect } from "react";
import { SafeAreaView, View, StyleSheet, TouchableOpacity, Image, Text, TextInput } from "react-native";
import * as ImagePicker from "expo-image-picker";



export default function Cam({ navigation }) {

  const [preview, setPreview] = useState("");
  const [Bio, setBio] = useState(false);
  const [upload, setUpload] = useState(null);
  function handleSelectTypeImage() {
    setBio(true);
  }

  async function UploadImage() {

    var data = new FormData();
    data.append("image", upload);

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log(this.responseText);
        navigation.navigate('Resultado');
      }
    });

    xhr.open("POST", "http://b619cacb4a44.ngrok.io/");

    xhr.send(data);
  }


  async function handleSelectCamera() {

    
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      resizeMode: '',
      aspect: [1, 1],

    })
    if (result.error) {
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
    if (result.error) {
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
        marginTop: 100,
        justifyContent: "center",
        alignItems: "center",
        width: 256,
        height: 256,
        borderWidth: preview ? 0 : 1,
        borderStyle: "dashed",
        borderColor: "#fff",
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
            (<Text></Text>)}
        
        </TouchableOpacity>

        
      </View>
      <Text style={styles.bioLabel}>Escolha a imagem da sua planta</Text> 

      <View style={styles.containerType}>
              <TouchableOpacity onPress={handleSelectGalery} >
                <Text style={styles.textButton}>Selecionar da galeria</Text>
              </TouchableOpacity>
              </View>
              
              <View style={styles.containerType2}>
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
    backgroundColor: '#f2f2f2',
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
    backgroundColor: "#fff",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop:20,
    marginBottom:5,
    zIndex: 1
    
  },
  containerType2: {
    width: 230,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    
    
  },

  textButton: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#777",
    marginBottom: 8
  },
  button: {
    width: "100%",
    height: "100%",
    backgroundColor: 'transparent',
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  camera: {
    height: 30,
    width: 30,
    resizeMode: "cover"
  },

  bioLabel: {
    color: "#000",
    fontSize: 16,
    textAlign: "center",
    
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
    marginTop: 20,
    backgroundColor: "#11A956"
  }
});

