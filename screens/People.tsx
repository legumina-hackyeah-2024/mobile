import React from "react";
import {Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {MOCKED_PEOPLE} from "../api/mocked";
import {useNavigation} from "@react-navigation/native";
import {Person} from "../api/types";

export function People({navigation}: any) {

    const height = Dimensions.get('window').height;
    const width = Dimensions.get('window').width;

    const navigateTo = (person: Person) => {
        navigation.navigate('PersonDetails', {person: person})
    }

    return <SafeAreaView>
        <ScrollView style={styles.container}>
            {MOCKED_PEOPLE.map(person => {
                return <TouchableOpacity style={styles.card} key={person.id} onPress={() => navigateTo(person)}>
                    <View style={styles.imageTile}>
                        <Image
                            style={{...styles.images, width: width * 0.9, height: height * 0.2}}
                            source={require('../assets/images/person_mockup.png')}
                        />
                    </View>
                    <Text style={styles.cardTitle}>{person.name}</Text>
                    <Text style={styles.cardDescription}>{person.description}</Text>
                </TouchableOpacity>
            })}
        </ScrollView>
    </SafeAreaView>
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