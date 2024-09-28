import React from "react";
import {Button, Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import {Route} from "../../api/types";
import {IdleMapPathRender} from "./IdleMapPathRender";
import {useQuery} from "@apollo/client";
import {GET_ROUTES_BY_ID} from "../../api/queries";

interface MarkerDetailsProps {
    propsData: Route,
    navigation: any
}

export function MarkerDetails({propsData, navigation}: MarkerDetailsProps) {
    const {loading, error, data}: any = useQuery(GET_ROUTES_BY_ID(propsData.id));

    const startNavigation = () => {
        navigation.navigate('FollowerMap', {propsData, data})
    }

    if(loading)
        return <></>

    return <View style={styles.container}>
        <Text style={styles.title}>{propsData.title}</Text>
        <View style={styles.detailsContainer}>
            <Text>Długość: {propsData.distance} km</Text>
            <Text>Trudność: {[...Array(propsData.difficulty)].map(() => '*')}</Text>
        </View>
        <SafeAreaView>
            <ScrollView style={styles.textArea}>
                <Text numberOfLines={10} ellipsizeMode='head'>{propsData.description}</Text>
                <View>
                    <IdleMapPathRender path={propsData} loading={loading} data={data}/>
                </View>
            </ScrollView>
        </SafeAreaView>

        <View>
            <Button color='black' title='Czytaj więcej'/>
        </View>
        <View style={styles.buttonContainer}>
            <Button color='white' title='Rozpocznij trasę' onPress={()=> startNavigation()}/>
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        paddingHorizontal: 40,
        gap: 10
    },
    textArea: {
        minHeight: Dimensions.get('window').height * 0.4,
        overflow: "scroll",
    },
    title: {
        fontSize: 27,
        fontWeight: 'bold'
    },
    blackedThemedButton: {},
    detailsContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 50
    },
    buttonContainer: {
        backgroundColor: 'black',
        borderRadius: 15
    }
});
