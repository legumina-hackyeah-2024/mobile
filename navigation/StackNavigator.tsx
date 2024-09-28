
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../screens/Home";
import {People} from "../screens/People";
import {Profile} from "../screens/Profile";

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
            <Stack.Screen name="Tracks" component={Home} />
        </Stack.Navigator>
    );
}

const PeopleStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{...screenOptionStyle,
            headerTitleAlign: 'left',
            headerShown: true,
            title: 'Postacie',
        }}>
            <Stack.Screen name="People" component={People} />
        </Stack.Navigator>
    );
}

const ProfileStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
    );
}


export { TracksStackNavigator, PeopleStackNavigator, ProfileStackNavigator };