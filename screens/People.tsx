import React from "react";
import {Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {MOCKED_PEOPLE} from "../api/mocked";
import {useNavigation} from "@react-navigation/native";
import {Person} from "../api/types";
import { useQuery } from "@apollo/client";
import { GET_ROUTES, HEROES } from "../api/queries";

export function People({navigation}: any) {
    const {loading, error, data}: any = useQuery(HEROES);

    const height = Dimensions.get('window').height;
    const width = Dimensions.get('window').width;

    const navigateTo = (person: Person) => {
        navigation.navigate('PersonDetails', {person: person})
    }

    return <SafeAreaView>
        <ScrollView style={styles.container}>
            {!loading && data.heros.map((person: any) => {
                return <>
                    <TouchableOpacity style={styles.card} key={person.id} onPress={() => navigateTo(person)}>
                        <View style={styles.imageTile}>
                            <Image
                                style={{...styles.images}}
                                source={{uri: person.picture}}
                            />
                        </View>
                        <View style={styles.texts}>
                            <Text style={styles.cardTitle}>{person.name}</Text>
                            <Text style={styles.cardDescription} numberOfLines={4}>{person.description}</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.divider}/>
                </>
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
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 20,
    },
    images: {
        width: 128,
        height: 128,
        borderRadius: 30,
        resizeMode: 'contain'
    },
    imageTile: {
        width: 128,
        height: 128,
    },
    texts: {
        flex: 2
    },
    cardTitle: {
        fontSize: 32,
        fontFamily: 'CaveatBrush_400Regular',
        color: '#295046'
    },
    cardDescription: {
        fontSize: 14,
        fontFamily: 'Sofia Sans',
        lineHeight: 20,
        color: '#19191B'
    },
    divider: {
        height: 2, 
        backgroundColor: '#E6E4DC',
        marginBottom: 20
    }
})