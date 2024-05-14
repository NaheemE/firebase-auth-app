import { StyleSheet, View, Text, Button, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default Login = ({ navigation, route }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const signIn = async () => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
      console.log('Sign In Successful');

      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('password', password);
      route.params.handleAsyncStorageChange();
      // navigation.navigate("Home")
      setEmail('')
      setPassword('')

    } catch (error) {
      console.log('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ width: '100%', alignItems: 'center' }}>
        <TextInput placeholder='Enter email' style={{ backgroundColor: 'white', width: '90%', marginBottom: 20, borderRadius: 5, }} onChangeText={text => setEmail(text)}
          value={email} />
        <TextInput placeholder='Enter password' style={{ backgroundColor: 'white', width: '90%', borderRadius: 5 }} onChangeText={text => setPassword(text)}
          value={password}
          secureTextEntry />
        <TouchableOpacity style={{ backgroundColor: 'plum', marginVertical: 40, padding: 15, width: '50%', borderRadius: 10 }} onPress={signIn}>
          <Text style={{ alignSelf: 'center' }}>Login</Text>
        </TouchableOpacity>
      </View>

      <Text onPress={() => navigation.navigate("Register")} style={{ color: 'white' }}>
        Don't have an Account? Register here!
      </Text>
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