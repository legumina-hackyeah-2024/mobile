import React from "react";
import {Button, Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import {Route} from "../../api/types";
import {IdleMapPathRender} from "./IdleMapPathRender";
import {useQuery} from "@apollo/client";
import {GET_ROUTES_BY_ID} from "../../api/queries";
import {Ionicons} from "@expo/vector-icons";

interface MarkerDetailsProps {
    propsData: Route,
    navigation: any,
    closeDrawer: any
}

export function MarkerDetails({propsData, navigation, closeDrawer}: MarkerDetailsProps) {
    const {loading, error, data}: any = useQuery(GET_ROUTES_BY_ID(propsData.id));

    let udogodnienieImages = new Map<string, any>([
        ["ELDERLY", <Image
            key={1}
            style={{width: 35, height: 35}}
            source={require("../../assets/icons/elderly.png")}
        />],
        ["CHILDREN", <Image
            key={2}
            style={{width: 35, height: 35}}
            source={require("../../assets/icons/children.png")}
        />],
        ["HANDICAPPED", <Image
            key={3}
            style={{width: 35, height: 35}}
            source={require("../../assets/icons/handicapped.png")}
        />
        ]

    ]);

    const getUdogodnienieImages = (facilities: string[]) => {
        return facilities.map(fc => udogodnienieImages.get(fc));
    }

    const startNavigation = () => {
        closeDrawer();
        navigation.navigate('FollowerMap', {propsData, data})
    }

    if (loading)
        return <></>

    return <View>
        <ScrollView style={styles.container} contentContainerStyle={{rowGap: 10}}>
            <Text style={styles.title}>{propsData.title}</Text>
            <View style={styles.descriptionArea}>
                <Text style={styles.description} numberOfLines={10} ellipsizeMode='head'>{propsData.description}</Text>
                <Image src={propsData.hero.picture} style={styles.image}/>
            </View>
            <View style={{height: 2, backgroundColor: '#E6E4DC'}}/>
            <View style={{display: 'flex', flexDirection: 'row', gap: 10}}>
                <Text style={{fontFamily: 'Sofia Sans'}}>Długość:</Text>
                <Text style={{fontWeight: 'bold'}}>{propsData.distance} km</Text>
            </View>
            <View/>
            {(propsData.facilities && propsData.facilities.length > 0) && (
                <View style={styles.facilities}>
                    <Text style={{fontFamily: 'Sofia Sans'}}>Trasa z ugodonieniami</Text>
                    {getUdogodnienieImages(propsData.facilities)}
                </View>
            )}

            <View style={styles.detailsContainer}>
                <Text style={{fontFamily: 'Sofia Sans'}}>Trudność:</Text>
                {[...Array(propsData.difficulty)].map((value, index, array) => <Image
                    key={index}
                    style={{width: 35, height: 35}}
                    source={require("../../assets/icons/star_fill.png")}
                />)}
                {[...Array(5 - propsData.difficulty)].map((value, index, array) => <Image
                    key={index + 10}
                    style={{width: 35, height: 35}}
                    source={require("../../assets/icons/star_empty.png")}
                />)}
            </View>
            <IdleMapPathRender path={propsData} loading={loading} data={data}/>
            <View style={styles.buttonContainer}>
                <Button color='white' title='Rozpocznij trasę' onPress={() => startNavigation()}/>
            </View>
        </ScrollView>
    </View>;
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        paddingHorizontal: 40,
        gap: 10,
        height: Dimensions.get('window').height * 0.65,
        marginBottom: 50
    },
    descriptionArea: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
    },
    image: {
        width: '50%', height: 200
    },
    facilities: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    description: {
        width: '50%',
        fontSize: 17,
        fontFamily: 'Sofia Sans'
    },
    textArea: {
        minHeight: Dimensions.get('window').height * 0.4,
        overflow: "scroll",
    },
    title: {
        fontSize: 45,
        fontWeight: 'bold',
        fontFamily: 'CaveatBrush_400Regular',
        color: '#295046'
    },
    blackedThemedButton: {},
    detailsContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between",
    },
    buttonContainer: {
        backgroundColor: '#295046',
        borderRadius: 25,
        marginTop: 30,
        padding: 10
    }
});
