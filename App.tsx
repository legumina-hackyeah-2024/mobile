import {NavigationContainer} from "@react-navigation/native";
import React from "react";
import {AppRegistry, Dimensions, StyleSheet, View} from "react-native";
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import {client} from "./api/ApolloClient";
import Home from "./screens/Home";
import {createStackNavigator} from "@react-navigation/stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import BottomTabNavigator from "./navigation/TabNavigator";

const Stack = createStackNavigator();

const screenOptionStyle = {
    headerStyle: {
        backgroundColor: "#9AC4F8",
    },
    headerTintColor: "white",
    headerBackTitle: "Back",
    headerShown: false
};

export default function App() {
    return <ApolloProvider client={client}>
            <NavigationContainer>
                <Stack.Navigator screenOptions={screenOptionStyle}>
                    <Stack.Screen name="Test" component={BottomTabNavigator}/>
                </Stack.Navigator>
            </NavigationContainer>
    </ApolloProvider>;

}



AppRegistry.registerComponent('MyApplication', () => App);
