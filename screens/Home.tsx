import React from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import Map from "../components/Map";
import Header from "../components/Header";

const Home = () => {
    return <View style={styles.container}>
        <Header/>
        <Map />
    </View>;
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white'
    }
})

export default Home;