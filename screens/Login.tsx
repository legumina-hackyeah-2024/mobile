import React from "react";
import {Button, StyleSheet, Text, View} from "react-native";
import * as WebBrowser from 'expo-web-browser';


export function Login() {

    const login = async () => {
        const result = await WebBrowser.openAuthSessionAsync('https://treasures-of-poland.up.railway.app/google');
        // console.log(result)
    }

    return <View style={styles.container}>
        <Text style={styles.text}>Skarby Polski</Text>
        <View style={styles.googleLoginButton}>
            <Button
                title={"Zaloguj się kontem google"}
                onPress={login}
                color='white'
            />
        </View>
        <View style={styles.line}/>
        <View>
            <Button color='black' title={"Zaloguj sie mailem"}/>
        </View>
        <View>
            <Button color='black' title={"Nie masz konta? Zarejestruj sie"}/>
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 90
    },
    text: {
        fontSize: 40,
        textAlign: 'center',
        marginBottom: 280
    },
    googleLoginButton: {
        backgroundColor: 'black',
        color: 'white',
        display: 'flex',
        marginLeft: 40,
        marginRight: 40,
        borderRadius: 15
    },
    line: {
        backgroundColor: 'grey',
        opacity: 0.3,
        height: 1,
        marginTop: 40
    }
})