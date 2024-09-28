import {StyleSheet, Text} from "react-native";
import React from "react";

export function Badges() {
    return <>
        <Text style={styles.formattedText}>Twoje odznaki</Text>

    </>
}


const styles = StyleSheet.create({
    formattedText: {
        fontSize: 20
    }
})