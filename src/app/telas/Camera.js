import React, { useState, useEffect , useRef} from 'react';
import { StyleSheet, Text, View as SaveAreaView, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { MaterialIcons } from '@expo/vector-icons'; 
import {FontAwesome} from '@expo/vector-icons';

export default function Cam() {
  const camRef = useRef (null);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <SaveAreaView />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

async function takePicture(){
if(camRef){
  const data= await camRef.current.takePictureAsync();
console.log(data);
}
}

  return (
    <SaveAreaView style={styles.container}>
      <Camera style={styles.camera} type={type} ref={camRef} >
        <SaveAreaView style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <MaterialIcons name="flip-camera-android" size={35} color="white" />
          </TouchableOpacity>

          

        </SaveAreaView>
      </Camera>

      <TouchableOpacity style={styles.button2} onPress={takePicture}>
<FontAwesome name="camera" size={23} color="#000" />

          </TouchableOpacity>
      

    </SaveAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row' ,
    margin: 20,
  },
  button: {
    flex: 0.2,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
    button2:{
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor:'#80c780',
    margin: 20,
    borderRadius: 10,
    height:50,

   
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});
