import { Button, StyleSheet, Text, View } from 'react-native'
import auth from '@react-native-firebase/auth';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default Home = ({ navigation, route }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signOut = async () => {
        try {
            await auth().signOut();
            console.log('Sign Out Successful');
            await AsyncStorage.removeItem('email');
            await AsyncStorage.removeItem('password');
            route.params.handleAsyncStorageChange();
            // navigation.navigate("Login")
        } catch (error) {
            console.log('Error', error.message);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const storedEmail = await AsyncStorage.getItem('email');
                const storedPassword = await AsyncStorage.getItem('password');
                setEmail(storedEmail);
                setPassword(storedPassword);
            } catch (error) {
                console.error('Error retrieving data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={{ color: 'white', fontSize: 30 }}>Welcome User</Text>
            <Text style={{ color: 'white', fontSize: 20 }}>Email: {email}</Text>
            <Text style={{ color: 'white', fontSize: 20 }}>Password: {password}</Text>
            <Button color='plum' title='Log Out' onPress={signOut} />
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