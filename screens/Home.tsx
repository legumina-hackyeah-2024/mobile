import React from "react";
import {View, Button, Text, StyleSheet} from "react-native";
import Map from "../components/Map/Map";
import Header from "../components/Header";

const Home = ({navigation}: any) => {
    return <>
        <Map navigation={navigation}/>
        <Header/>
    </>
};


export default Home;