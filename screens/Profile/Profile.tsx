import React from "react";
import {Image, SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import UserHeader from "./UserHeader";
import {Badges} from "./Badges";
import { USERNAME } from "../../api/queries";
import { useQuery } from "@apollo/client";

export function Profile({navigation}: any) {
    const {loading, error, data}: any = useQuery(USERNAME, {
        context: {
            headers: {
                Authorization: `Bearer ${process.env.EXPO_PUBLIC_JWT}`,
            },
        }
    });

    return <SafeAreaView>
        <ScrollView style={styles.container} contentContainerStyle={{rowGap: 10}}>
            <UserHeader navigation={navigation}/>
            <View style={styles.border}/>
            <Text style={styles.header}>Twoje odznaki</Text>
            <ScrollView horizontal={true} style={{padding: 10, height: 100}} contentContainerStyle={{ columnGap: 10 }}>
                { !loading && data.userMe.badges.map((badge: any, index: number) => 
                    <View key={index}>
                        <Image style={{width: 80, height: 80}} source={{uri: badge.picture}}/>
                    </View>
                )}
            </ScrollView>
            <Text style={{ ...styles.header, marginBottom: 20 }}>Twoje statystyki</Text>
            <View style={styles.wrapper}>
                <Image style={{width: 24, height: 24}} source={require('../../assets/icons/walking.png')}/>
                <Text style={{ ...styles.formattedText, flex: 1 }}>Dystans</Text>
                <Text style={{ ...styles.formattedText, fontWeight: 'bold' }}>10 km</Text>
            </View>
            <View style={styles.wrapper}>
                <Image style={{width: 24, height: 24}} source={require('../../assets/icons/clock.png')}/>
                <Text style={{ ...styles.formattedText, flex: 1 }}>Godziny</Text>
                <Text style={{ ...styles.formattedText, fontWeight: 'bold' }}>2 h 16 m</Text>
            </View>
            <View style={styles.wrapper}>
                <Image style={{width: 24, height: 24}} source={require('../../assets/icons/merge.png')}/>
                <Text style={{ ...styles.formattedText, flex: 1 }}>Trasy</Text>
                <Text style={{ ...styles.formattedText, fontWeight: 'bold' }}>5</Text>
            </View>
            <Text style={{ ...styles.header, marginVertical: 20 }}>Znajomi</Text>
            {
                !loading && data.userMe.friends.map((friend: any, index: number) => {
                    return <> 
                        <View key={index} style={{  marginHorizontal: 20, display: 'flex', flexDirection: 'row' }}>
                            <Text style={{ flex: 1, fontFamily: 'Sofia Sans', fontWeight: 800, fontSize: 16, color: '#295046' }}>{friend.username}</Text>
                            <Image style={{width: 24, height: 24}} source={require('../../assets/icons/trashcan.png')}/>
                        </View>
                        { index !== data.userMe.friends.length - 1 && <View style={styles.border}/> }
                    </>
                })
            }
        </ScrollView>
    </SafeAreaView>
}


const styles = StyleSheet.create({
    container: {
        minHeight: 1000,
        backgroundColor: 'white',
    },
    header: {
        fontSize: 24,
        paddingHorizontal: 20,
        fontFamily: 'CaveatBrush_400Regular',
        color: '#295046'
    },
    border: {
        height: 2,
        backgroundColor: '#EFEFF0',
        marginHorizontal: 20,
        marginBottom: 20
    },
    formattedText: {
        fontSize: 16,
        fontFamily: 'Sofia Sans',
    },
    wrapper: {
        display: 'flex', 
        flexDirection: 'row', 
        paddingHorizontal: 20, 
        paddingVertical: 10, 
        gap: 20, 
        backgroundColor: '#F6F4F0', 
        marginHorizontal: 20, 
        borderRadius: 50, 
    }
})