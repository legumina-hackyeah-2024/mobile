import React from "react";
import {Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import {MOCKED_PEOPLE} from "../api/mocked";

export function People() {

    const height = Dimensions.get('window').height;
    const width = Dimensions.get('window').width;

    return <SafeAreaView>
        <ScrollView style={styles.container}>
            {MOCKED_PEOPLE.map(person => {
                return <View style={styles.card} key={person.id}>
                    <View style={styles.imageTile}>
                        <Image
                            style={{...styles.images, width: width * 0.9, height: height * 0.2}}
                            source={require('../assets/images/person_mockup.png')}
                        />
                    </View>
                    <Text style={styles.cardTitle}>{person.name}</Text>
                    <Text style={styles.cardDescription}>{person.description}</Text>
                </View>
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