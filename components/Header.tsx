import React from "react";
import {StyleSheet, Text, View} from "react-native";

const Header = () => {
    return <View style={styles.container}>
        <Text style={styles.header}>Hej, [name]!</Text>
        <Text style={styles.content}>Co chcesz dzisiaj odkryć</Text>
    </View>
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
        rowGap: 5,
        padding: 15
    },
    header: {
        fontSize: 40,
    },
    content: {
        fontSize: 17
    }
})

export default Header;