import {Marker} from "../api/types";
import React from "react";
import {Button, Dimensions, StyleSheet, Text, View} from "react-native";

interface MarkerDetailsProps {
    data: Marker
}

export function MarkerDetails({data}: MarkerDetailsProps) {
    return <View style={styles.container}>
        <Text style={styles.title}>{data.title}</Text>
        <View style={styles.detailsContainer}>
            <Text>Długość: {data.place.length} km</Text>
            <Text>Trudność: {[...Array(data.place.level)].map(() => '*')}</Text>
        </View>
        <View style={styles.textArea}>
            <Text numberOfLines={10} ellipsizeMode='head'>{data.place.description}</Text>
        </View>
        <View>
            <Button color='black' title='Czytaj więcej'/>
        </View>
        <View style={styles.buttonContainer}>
            <Button color='white' title='Rozpocznij trasę'/>
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        paddingHorizontal: 40,
        gap: 10
    },
    textArea: {
        height: 150,
        overflow: "hidden",
    },
    title: {
        fontSize: 27,
        fontWeight: 'bold'
    },
    blackedThemedButton: {},
    detailsContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 50
    },
    buttonContainer: {
        backgroundColor: 'black',
        borderRadius: 15
    }
});
