import React from "react";
import {Button, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import * as WebBrowser from 'expo-web-browser';


export function Login() {

    const login = async () => {
        const result = await WebBrowser.openAuthSessionAsync('https://treasures-of-poland.up.railway.app/google?redirect_uri=' + 'exp://172.20.10.3:8081')
            .then(res => console.log(res));
        console.log(result)
    }

    return <View style={styles.container}>
        <Text style={styles.text}>Legendarium</Text>
        <View style={styles.line}/>
        <TouchableOpacity style={styles.googleLoginButton} onPress={login}>
            <Image source={require('../assets/icons/googleIcon.png')} style={{width: 25, height: 25}}/>
            <Text style={{fontSize: 20, fontWeight:"900",fontFamily: 'Sofia Sans', color: 'white'}}>Zaloguj sie kontem Google</Text>
        </TouchableOpacity>
        <View style={{height: 50, marginHorizontal: 20,borderColor: '#295046', borderWidth: 1, borderRadius: 10, marginTop: 17, display: "flex", justifyContent: 'center'}}>
            <Button color='#295046' title={"Zaloguj się mailem"}/>
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 90
    },
    text: {
        fontSize: 60,
        textAlign: 'center',
        marginBottom: 40,
        fontFamily: 'CaveatBrush_400Regular',
        color: '#295046'
    },
    googleLoginButton: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#295046',
        justifyContent: "center",
        gap: 20,
        alignItems: "center",
        marginHorizontal: 20,
        height: 50,
        borderRadius: 10,
    },
    line: {
        backgroundColor: 'grey',
        opacity: 0.3,
        height: 1,
        marginTop: 40,
        marginBottom: 200,
        marginHorizontal: 20,
    }
})