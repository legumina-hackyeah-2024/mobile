import React, {useEffect, useState} from "react";
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    Image,
} from "react-native";
import * as Location from "expo-location";
import MapView, {Marker} from "react-native-maps";
import {MOCKED_MARKERS} from "../api/mocked";
import {DrawerModal} from "./DrawerModal";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Map = () => {
    // const { loading, error, data } = useQuery(GET_DOGS);
    const [currentLocation, setCurrentLocation]: any = useState(null);
    const [initialRegion, setInitialRegion]: any = useState(null);
    const [isDrawerOpen, setDrawerOpen] = useState(false);

    const openDrawer = () => {
        setDrawerOpen(true);
    };

    const closeDrawer = () => {
        setDrawerOpen(false);
    };

    const onRegionChange = (region: any) => {
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

                    {currentLocation && (
                        MOCKED_MARKERS.map(marker => {
                            return <Marker
                                key={marker.title}
                                coordinate={{
                                    latitude: marker.lat,
                                    longitude: marker.lon,
                                }}
                                title={marker.title}
                                onPress={() => openDrawer()}

                            >
                                <Image
                                    style={{width: 30, height: 30}}
                                    source={require('../assets/icons/map_pin.png')}
                                />
                            </Marker>
                        }))}
                </MapView>
            )}
            <DrawerModal isDrawerOpen={isDrawerOpen}
                         closeDrawer={closeDrawer}

            />
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