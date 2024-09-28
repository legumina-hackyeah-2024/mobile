import React from "react";
import {Image, StyleSheet, Text, View} from "react-native";

const Header = () => {
    return <View style={styles.container}>
        <View style={styles.hiContainer}>
            <Text style={styles.header}>Hej, Kuba! </Text>
            <Image
                style={{width: 35, height: 35}}
                source={require("../assets/icons/hi_icon.png")}
            />
        </View>
        <Text style={styles.content}>Co chcesz dzisiaj odkryć</Text>
    </View>
}

const styles = StyleSheet.create({
    hiContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: "center",
    },
    container: {
        backgroundColor: 'white',
        rowGap: 10,
        paddingHorizontal: 30,
        paddingVertical: 25
    },
    header: {
        fontSize: 50,
        fontFamily: 'CaveatBrush_400Regular',
        color: '#295046'
    },
    content: {
        fontSize: 17,
        color: '#295046',
        fontFamily: 'Sofia Sans'
    }
})

export default Header;