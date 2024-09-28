import React from "react";
import {StyleSheet, Text, View} from "react-native";

const Header = () => {
    return <View style={styles.container}>
        <Text>Hej, [name]!</Text>
        <Text>Co chcesz dzisiaj odkryć</Text>
    </View>
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white'
    },
    header: {

    },
    content: {

    }
})

export default Header;