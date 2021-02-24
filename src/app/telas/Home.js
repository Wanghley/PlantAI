
import React from 'react';
import { StyleSheet, Text, View , Button} from 'react-native';

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>tela home</Text>
      <Button
        title="ir para login"
        onPress={() => navigation.navigate('Login')}
      />
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
