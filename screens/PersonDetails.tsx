import React from "react";
import {Dimensions, Image, StyleSheet, Text, View} from "react-native";
import {Person} from "../api/types";

export function PersonDetails({navigation, route}: any) {
    const height = Dimensions.get('window').height;
    const width = Dimensions.get('window').width;
    const person: Person = route.params.person;

    return <View style={styles.container}>
        <Image
            style={{...styles.images, width: width * 0.8, aspectRatio: 1, resizeMode: 'contain' }}
            source={{ uri: person.picture }}
        />
        <View style={styles.divider}/>
        <Text style={styles.cardTitle}>{person.name}</Text>
        <Text style={styles.cardDescription}>{person.description}</Text>
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
        marginHorizontal: 'auto',
    },
    imageTile: {
        display: "flex",
    },
    cardTitle: {
       fontSize: 64,
        fontFamily: 'CaveatBrush_400Regular',
        color: '#295046'
    },
    cardDescription: {
        fontSize: 14,
        fontFamily: 'Sofia Sans',
        lineHeight: 20,
        color: '#19191B'
    },
    divider: {
        height: 2, 
        backgroundColor: '#E6E4DC',
        marginBottom: 5,
        marginTop: 10
    }
})