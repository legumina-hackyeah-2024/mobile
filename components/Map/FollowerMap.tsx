import React, {useEffect, useRef, useState} from "react";
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    Image,
} from "react-native";
import * as Location from "expo-location";
import MapView, {Marker} from "react-native-maps";
import {MOCKED_MARKERS} from "../../api/mocked";
import CustomBottomDrawer from "../BottomDrawer";
import {MarkerDetails} from "./MarkerDetails";
import {useQuery} from "@apollo/client";
import {GET_ROUTES} from "../../api/queries";
import MapViewDirections from 'react-native-maps-directions';


const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Map = () => {
    const [currentLocation, setCurrentLocation]: any = useState(null);
    const [initialRegion, setInitialRegion]: any = useState(null);
    const currentMarker: any = useRef();
    let _mapView: any = useRef<MapView>(null);


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
                latitudeDelta: 0.015,
                longitudeDelta: 0.015,
            });
        };

        getLocation();
    }, []);

    return (
        <View style={styles.container}>
            {initialRegion && (
                <MapView style={styles.map}
                         initialRegion={initialRegion}
                         ref={(current) => {
                             // @ts-ignore
                             _mapView.current = current
                         }}
                         zoomTapEnabled
                         zoomControlEnabled
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
        }
    ]

export default Map;