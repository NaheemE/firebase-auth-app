import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react';
import auth from '@react-native-firebase/auth';

export default Register = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signUp = async () => {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      console.log('Sign Up Successful');
      navigation.navigate("Login")
    } catch (error) {
      console.log('Error', error.message);
    }
  };


  return (
    <View style={styles.container}>
      <View style={{ width: '100%', alignItems: 'center' }}>
        <TextInput placeholder='Enter email' style={{ backgroundColor: 'white', width: '90%', marginBottom: 20, borderRadius: 5 }} onChangeText={text => setEmail(text)}
          value={email} />
        <TextInput placeholder='Enter password' style={{ backgroundColor: 'white', width: '90%', borderRadius: 5 }} onChangeText={text => setPassword(text)}
          value={password}
          secureTextEntry />
        <TouchableOpacity style={{ backgroundColor: 'plum', marginVertical: 40, padding: 15, width: '50%', borderRadius: 10 }} onPress={signUp}>
          <Text style={{ alignSelf: 'center' }}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#242526",
    alignItems: 'center',
    justifyContent: 'center'
  }
})