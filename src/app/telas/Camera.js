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
    return <Text>Sem acesso a câmera!</Text>;
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
          
          <TouchableOpacity style={styles.galleryButtom} onPress={takePicture}>
<FontAwesome name="picture-o" size={70} color="black" /> 
          </TouchableOpacity>
                
          <TouchableOpacity style={styles.takePicButtom} >
          </TouchableOpacity>

          <TouchableOpacity style={styles.turnButton} onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
              
            }}>
            <MaterialIcons name="flip-camera-android" size={70} color="#000" />
          </TouchableOpacity>

        </SaveAreaView>
        
      </Camera>     
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
    flexDirection:'row',
    backgroundColor: '#FFF',
    marginTop: 583.5,
    justifyContent: 'center',
    alignItems:'baseline',
    marginLeft: 0,
  },

  turnButton: {
    marginRight:5,
    
    
  },
    takePicButtom:{
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor:'#80c780',
    borderRadius: 850,
    marginVertical: 30,
    height:90,
    width:90,
    marginHorizontal: 60, 
  },
  galleryButtom:{

  },
  
});
