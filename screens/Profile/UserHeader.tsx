import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";

const UserHeader = ({ navigation }: any) => {
    return <View style={headerStyles.container}>
        <Text style={headerStyles.header}>Hej, [name]!</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <Image
                style={{width: 30, height: 30}}
                source={require('../../assets/icons/settings.png')}
            />
        </TouchableOpacity>
    </View>
}

const headerStyles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 15,
        paddingHorizontal: 30,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center'
    },
    header: {
        fontSize: 40,
    },
    content: {
        fontSize: 17
    }
})

export default UserHeader;