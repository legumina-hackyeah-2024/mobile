import {NavigationContainer} from "@react-navigation/native";
import React from "react";
import DrawerNavigator from "./navigation/DrawerNavigator";
import {AppRegistry} from "react-native";
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import {client} from "./api/ApolloClient";

export default function App() {
    return <ApolloProvider client={client}>
        <NavigationContainer>
            <DrawerNavigator/>
        </NavigationContainer>
    </ApolloProvider>;

}

AppRegistry.registerComponent('MyApplication', () => App);
