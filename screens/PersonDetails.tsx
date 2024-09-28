import React from "react";
import {Dimensions, Image, StyleSheet, Text, View} from "react-native";
import {Person} from "../api/types";

export function PersonDetails({navigation, route}: any) {
    const height = Dimensions.get('window').height;
    const width = Dimensions.get('window').width;
    const person: Person = route.params.person;

    return <View style={styles.container}>
        <Image
            style={{...styles.images, width: width * 0.9, height: height * 0.2}}
            source={require('../assets/images/person_mockup.png')}
        />
        <Text>{person.name}</Text>
        <Text>{person.description}</Text>
    </View>
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        gap: 20,
        padding: 20,
        minHeight: Dimensions.get('window').height,
    },
    card: {
        display: "flex",
        justifyContent: "center",
        marginBottom: 40,
    },
    images: {
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'rgba(12,12,12,0.27)'
    },
    imageTile: {
        display: "flex",
        alignItems: 'center',
    },
    cardTitle: {
        textAlign: "left",
        fontSize: 20,
    },
    cardDescription: {}
})