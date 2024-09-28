import React from "react";
import {Image, SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import UserHeader from "./UserHeader";
import {Badges} from "./Badges";

export function Profile({navigation}: any) {
    return <SafeAreaView>
        <ScrollView style={styles.container} contentContainerStyle={{rowGap: 10}}>
            <UserHeader navigation={navigation}/>
            <View style={styles.border}/>

            <Text>Twoje statystki</Text>
            <Badges />
            <View>
                <Text>Dystans</Text>
            </View>
            <View>
                <Text>Godziny</Text>
            </View>
            <View>
                <Text>Trasy</Text>
            </View>
            {/*przyjaciele*/}
            <View>
                <Text>Twoi przyjaciele</Text>
                {/*lista przyjaciol*/}
            </View>
        </ScrollView>
    </SafeAreaView>
}


const styles = StyleSheet.create({
    container: {
        minHeight: 1000,
        backgroundColor: 'white',
    },
    border: {
        height: 2,
        backgroundColor: '#EFEFF0',
    },
    formattedText: {
        fontSize: 20
    }
})