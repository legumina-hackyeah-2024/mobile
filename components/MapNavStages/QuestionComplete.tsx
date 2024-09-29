import React from "react";
import {Button, Dimensions, StyleSheet, Text, View} from "react-native";

export function QuestionComplete({goNextStage}: any) {
    return <View style={styles.container}>
        <Text style={styles.formattedText}>Zadanie Wykonane</Text>
        <Text style={{fontFamily: 'Sofia Sans'}}>Lorem ipsum dolor sit amet consectetur. Tristique pellentesque tellus tellus auctor velit ornare urna eget tortor. Sollicitudin quisque tristique viverra tortor. Sollicitudin quisque. tristique viverra tortor. Sollicitudin quisque.</Text>
        <View style={styles.buttonStyle}>
            <Button color='white' title='Ruszamy dalej' onPress={() => goNextStage()}/>
        </View>
    </View>

}

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height * 0.4,
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 30,
        padding: '8%',
        gap: Dimensions.get('window').height * 0.02
    },
    formattedText: {
        fontFamily: 'CaveatBrush_400Regular',
        color: '#295046',
        fontSize: 40
    },
    buttonStyle: {
        backgroundColor: '#295046',
        borderRadius: 20,
        padding: 8
    }
})