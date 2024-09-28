import React from "react";
import {Button, Dimensions, StyleSheet, Text, View} from "react-native";

export function QuestionStage({goNextStage}: any) {
    const onPress = () => {
        goNextStage();
    }

    return <View style={styles.container}>
        <Text style={styles.formattedText}>Twoje zadanie</Text>
        <Text>Lorem ipsum dolor sit amet consectetur. Tristique pellentesque tellus tellus auctor velit ornare urna eget tortor. Sollicitudin quisque tristique viverra tortor. Sollicitudin quisque. tristique viverra tortor. Sollicitudin quisque.</Text>
        <View style={styles.buttonStyle}>
            <Button color='#295046' title='Odpowiedź A' onPress={onPress}/>
        </View>

        <View style={styles.buttonStyle}>
            <Button color='#295046' title='Odpowiedź B' onPress={onPress}/>
        </View>

        <View style={styles.buttonStyle}>
            <Button color='#295046' title='Odpowiedź C' onPress={onPress}/>
        </View>

        <View style={styles.buttonStyle}>
            <Button color='#295046' title='Odpowiedź D' onPress={onPress}/>
        </View>
    </View>

}

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height * 0.7,
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 30,
        paddingHorizontal: '8%',
        paddingVertical: 4,
        gap: Dimensions.get('window').height * 0.02
    },
    formattedText: {
        fontFamily: 'CaveatBrush_400Regular',
        fontSize: 40
    },
    buttonStyle: {
        backgroundColor: '#E8F3F0',
        borderRadius: 20,
    }
})