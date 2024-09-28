import React, {useEffect, useState} from "react";
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Dimensions,
    Image,
} from "react-native";
import * as Location from "expo-location";
import MapView, {Marker} from "react-native-maps";
import {useQuery} from "@apollo/client";
import {GET_DOGS} from "../api/queries";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Map = () => {
    const { loading, error, data } = useQuery(GET_DOGS);
    const [currentLocation, setCurrentLocation]: any = useState(null);
    const [initialRegion, setInitialRegion]: any = useState(null);

    const onRegionChange = (region: any) => {
        console.log(region)
    }

    useEffect(() => {
        const getLocation = async () => {
            let {status} = await Location.requestForegroundPermissionsAsync();

            if (status !== "granted") {
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setCurrentLocation(location.coords);

            setInitialRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            });
        };
        // 50.067877, 19.991392

        getLocation();
    }, []);


    return (
        <View style={styles.container}>
            {initialRegion && (
                <MapView style={styles.map}
                         initialRegion={initialRegion}
                         zoomTapEnabled
                         zoomControlEnabled
                         onRegionChangeComplete={onRegionChange}
                         showsBuildings={false}
                         customMapStyle={mapStyle}
                >
                    {currentLocation && (
                        <Marker
                            coordinate={{
                                latitude: currentLocation.latitude,
                                longitude: currentLocation.longitude,
                            }}
                            title="Your Location"
                        />
                    )}
                </MapView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    map: {
        width: "100%",
        height: "100%",
    },
});

const mapStyle =
    [
        {
            "featureType": "poi.business",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi.business",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi", // Points of interest
            "elementType": "labels",
            "stylers": [
                {"visibility": "off"} // Hide all POI labels
            ]
        },
        {
            "featureType": "poi.business",
            "stylers": [
                {"visibility": "off"} // Hide business POIs
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "labels.text",
            "stylers": [
                {"visibility": "off"} // Hide park labels
            ]
        },
        {
            "featureType": "administrative", // Hide administrative labels
            "elementType": "labels",
            "stylers": [
                {"visibility": "off"}
            ]
        }
    ]

export default Map;