import React, { useState, useEffect } from "react";
import { SafeAreaView, View, ImageBackground, StyleSheet, TouchableOpacity, Image, Text, TextInput } from "react-native";
//import background from "./assets/fazendomusica.jpg";
import * as ImagePicker from "expo-image-picker";
//import api from "../services/api";


export default function Cam() {
  const [preview, setPreview] = useState("");
  const [types, setTypes] = useState(true);
  //const [upload, setUpload] = useState(null);
  function handleSelectTypeImage() {
    setTypes(true);
  }
/*
  async function UploadImage() {
    const formData = new FormData();
    formData.append("image", upload);
    console.log(formData)
    const { data } = await api.post("/posts", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    // console.log(data)
  }davilemon#5478
*/
  async function handleSelectCamera() {
    setTypes(false);
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      resizeMode : '' ,
      aspect:[1,1],

    })
    if (result.error) {
      console.log("Error")
    } else {
      let prefix;
      let ext;
      if (result.fileName) {
        [prefix, ext] = result.fileName;
        ext = ext.toLowerCase() === 'heic' ? 'jpg' : ext;
      } else {
        prefix = new Date().getTime();
        ext = 'jpg'
      }
      /*
     const imageUpload = {
      uri: result.uri,
        type: result.type,
        name: `${prefix}.${ext}`
      }*/
      //setUpload(imageUpload);
      setPreview(result.uri);
      console.log(result.uri);
    }
  }
  

  async function handleSelectGalery() {
    setTypes(false);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      
      allowsEditing: true,
    });
    if (result.error) {
      console.log("Error")
    } else {
      let prefix;
      let ext;
      if (result.fileName) {
        [prefix, ext] = result.fileName;
        ext = ext.toLowerCase() === 'heic' ? 'jpg' : ext;
      } else {
        prefix = new Date().getTime();
        ext = 'jpg'
      }
     /* const imageUpload = {
        uri: result.uri,
        type: result.type,
        name: `${prefix}.${ext}`
      }*/
      //setUpload(imageUpload);
      setPreview(result.uri);
    }
  }

  return (
    <SafeAreaView style={styles.back}>
      

        <View style={{
          marginTop: 100,
          justifyContent: "center",
          alignItems: "center",
          width: 230,
          height: 240,
          borderWidth: preview ? 0 : 1,
          borderStyle: "dashed",
          borderColor: "#fff",
          borderRadius: 7,
          resizeMode : 'contain',
        }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleSelectTypeImage()}
          >
            {types && (
              <View style={styles.containerType}>
                <TouchableOpacity onPress={handleSelectGalery} >
                  <Text style={styles.textButton}>Selecionar da galeria</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSelectCamera}>
                  <Text style={styles.textButton}>Capturar da câmera</Text>
                </TouchableOpacity>
              </View>
            )}
            {preview.length > 0 ? (
              <Image style={styles.image} source={{
                uri: preview
              }} />
            ) :
              (<Text></Text>)}
          </TouchableOpacity>
        </View>
        <Text style={styles.bioLabel}>Selecione uma imagem de perfil</Text>
        <TouchableOpacity style={styles.bioButton}>
          <Text style={styles.Label} >Avançar</Text>
        </TouchableOpacity>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  back: {
    backgroundColor: '#f2f2f2',
    height: "100%",
    width: "100%",
    resizeMode: "cover",
    alignItems: "center"
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
    borderRadius: 7
  },
  containerType: {
    width: 230,
    height: 100,
    backgroundColor: "#fff",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1
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
    backgroundColor: 'black',
    justifyContent: "center",
    alignItems: "center"
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
    marginTop: 60,
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

  
