import React from "react";
import {createStackNavigator} from "@react-navigation/stack";

import Home from "../screens/Home";
import {People} from "../screens/People";
import {Profile} from "../screens/Profile/Profile";
import {PersonDetails} from "../screens/PersonDetails";
import {Settings} from "../screens/Settings";
import FollowerMap from "../components/Map/FollowerMap";

const Stack = createStackNavigator();

const screenOptionStyle = {
    headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        height: 70
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
            title: 'Postacie',
        }}>
            <Stack.Screen name="People" component={People}/>
            <Stack.Screen name="PersonDetails"
                          component={PersonDetails}
                          options={{headerBackTitle: '', headerTitle: '', headerTintColor: 'black'}}
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