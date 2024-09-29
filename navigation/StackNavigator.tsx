import React from "react";
import {createStackNavigator} from "@react-navigation/stack";

import Home from "../screens/Home";
import {People} from "../screens/People";
import {Profile} from "../screens/Profile/Profile";
import {PersonDetails} from "../screens/PersonDetails";
import {Settings} from "../screens/Settings";
import FollowerMap from "../components/Map/FollowerMap";
import { Image } from "react-native";

const Stack = createStackNavigator();

const screenOptionStyle = {
    headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        height: 70,
        fontFamily: 'CaveatBrush_400Regular',
    },
    headerShown: false,
};

const TracksStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name="Tracks" component={Home}/>
        </Stack.Navigator>
    );
}

const PeopleStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{
            ...screenOptionStyle,
            headerTitleAlign: 'left',
            headerShown: true,
            headerTitleStyle: {
                fontFamily: 'CaveatBrush_400Regular',
                color: '#295046',
                fontSize: 50,
            },
            title: 'Kronika',
        }}>
            <Stack.Screen name="People" component={People}/>
            <Stack.Screen name="PersonDetails"
                          component={PersonDetails}
                          options={{
                            headerBackTitleVisible: false, 
                            headerTitle: () => null, 
                            headerTintColor: 'black',
                            headerBackImage: () => <Image source={require('../assets/icons/back-arrow.png')} style={{width: 24, height: 24, marginLeft: 20}}/>
                        }}
            />
        </Stack.Navigator>
    );
}

const ProfileStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name="Profile" component={Profile} options={{headerShown: false}}/>
            <Stack.Screen name="Settings" component={Settings} options={{
                headerShown: true,
                headerTitle: '',
                headerBackTitle: '',
                headerTintColor: 'black'
            }}/>
        </Stack.Navigator>
    );
}


export {TracksStackNavigator, PeopleStackNavigator, ProfileStackNavigator};