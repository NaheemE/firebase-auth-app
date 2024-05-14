import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from './Components/Login'
import Register from './Components/Register'
import Home from './Components/Home'
import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator()

export default App = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  const fetchData = async () => {
    try {
      const storedEmail = await AsyncStorage.getItem('email');
      const storedPassword = await AsyncStorage.getItem('password');
      setEmail(storedEmail);
      setPassword(storedPassword);
      console.log(storedEmail + '-----------' + storedPassword);
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  };

  useEffect(() => {

    fetchData();
  }, []);

  const handleAsyncStorageChange = () => {
    fetchData();
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {
          email && password || email !== null || password !== null ?
            (
              <>
                <Stack.Screen name='Home' component={Home}
                  options={{ headerShown: false }}
                  initialParams={{ handleAsyncStorageChange }} />
              </>
            ) :
            (
              <>
                <Stack.Screen name='Login' component={Login}
                  initialParams={{ handleAsyncStorageChange }} />
                <Stack.Screen name='Register' component={Register} />
              </>
            )
        }


      </Stack.Navigator>
    </NavigationContainer>
  )
}



