import React from "react";
import {Button, Dimensions, Image, StyleSheet, Text, View} from "react-native";

export function FinishScreen({navigation}: any) {
    return <View style={styles.container}>
        <Image
            style={{width: 350, height: 350}}
            source={require("../assets/images/last_person.png")}
        />
        <View style={styles.content}>
            <Text style={{
                fontFamily: 'CaveatBrush_400Regular',
                color: '#295046',
                fontSize: 50,
            }}>Brawo</Text>
            <Text style={{fontFamily: 'Sofia Sans', fontSize: 17}}>Lorem ipsum dolor sit amet consectetur. Tristique pellentesque tellus tellus auctor velit ornare urna
                eget tortor. Sollicitudin quisque tristique viverra turpis tellus suscipit duis dignissim libero.</Text>
            <View style={{backgroundColor: '#3A6157', borderRadius: 25}}>
                <Button color='white' title='Moje odznaki'/>
            </View>
            <View style={{borderColor: '#3A6157', borderRadius: 25, borderWidth: 1}}>
                <Button color='#3A6157' title='Wróć do ekranu głównego' onPress={() => navigation.navigate('Test')}/>
            </View>
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 60,
        paddingHorizontal: 40,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    content: {
        display: "flex",
        justifyContent: "space-between",
        height: Dimensions.get('window').height * 0.4
    }
});