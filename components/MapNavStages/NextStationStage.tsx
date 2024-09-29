import {Dimensions, StyleSheet, Text, View} from "react-native";
import React from "react";

interface BottomMapNavProps {
    nextStation: string
    theme: string
    duration: number
    distanceLeft: number
    description: string
}

export function NextStationStage({nextStation,description, theme, distanceLeft, duration}: BottomMapNavProps) {

    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = Math.floor(seconds % 60)
        return `${h}:${m < 10 ? '0' : ''}${m}:${s}`;
    };

    return <View style={styles.container}>
        <Text style={styles.formattedText}>Następna stacja: {nextStation}</Text>
        <Text>{description}</Text>
        <View style={styles.line}/>
        <Text style={styles.formattedText}>{theme}</Text>
        <View style={styles.informationContent}>
            <Text>Czas Trwania: {formatTime(duration)} h</Text>
            <Text>Pozostało: {distanceLeft} km</Text>
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height * 0.6,
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 30,
        padding: '8%',
        gap: Dimensions.get('window').height * 0.02
    },
    line: {
        backgroundColor: '#E6E4DC',
        height: 1,
        width: '80%',
    },
    formattedText: {
        fontFamily: 'CaveatBrush_400Regular',
        color: '#295046',
        fontSize: 30
    },
    informationContent: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: '#F6F4F0',
        borderRadius: 24,
        padding: 10
    }
})