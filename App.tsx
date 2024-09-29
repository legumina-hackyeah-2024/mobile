import {NavigationContainer} from "@react-navigation/native";
import React from "react";
import {AppRegistry, Dimensions, StyleSheet, Text, View} from "react-native";
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import {client} from "./api/ApolloClient";
import Home from "./screens/Home";
import {createStackNavigator} from "@react-navigation/stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import BottomTabNavigator from "./navigation/TabNavigator";
import {Login} from "./screens/Login";
import FollowerMap from "./components/Map/FollowerMap";
import {useFonts} from "expo-font";
import {CaveatBrush_400Regular} from "@expo-google-fonts/caveat-brush";
import {SofiaSans_300Light} from "@expo-google-fonts/sofia-sans";


const Stack = createStackNavigator();

const screenOptionStyle = {
    headerStyle: {
        backgroundColor: "#9AC4F8",
        fontFamily: "CaveatBrush_400Regular",
    },
    headerTintColor: "white",
    headerBackTitle: "Back",
    headerShown: false
};

export default function App() {
    const [fontsLoaded] = useFonts({
        CaveatBrush_400Regular,
        SofiaSans_300Light
    });

    if (!fontsLoaded) {
        return <Text>Loading...</Text>;
    }

    return <ApolloProvider client={client}>
            <NavigationContainer>
                <Stack.Navigator screenOptions={screenOptionStyle}>
                    <Stack.Screen name="Test" component={BottomTabNavigator}/>
                    <Stack.Screen name="LoginNavigator" component={Login} />
                    <Stack.Screen name="FollowerMap" component={FollowerMap}/>
                </Stack.Navigator>
            </NavigationContainer>
    </ApolloProvider>;

}



AppRegistry.registerComponent('MyApplication', () => App);
