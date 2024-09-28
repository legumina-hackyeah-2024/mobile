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

const Map = ({navigation}: any) => {
    const {loading, error, data}: any = useQuery(GET_ROUTES);
    const [currentLocation, setCurrentLocation]: any = useState(null);
    const [initialRegion, setInitialRegion]: any = useState(null);
    const [isDrawerOpened, setDrawerOpened]: any = useState(false);
    const currentMarker: any = useRef();
    let _mapView: any = useRef<MapView>(null);

    useEffect(() => {
        if(currentMarker.current && _mapView.current) {
            _mapView.current.animateToRegion({
                    longitude: currentMarker.current.lng,
                    latitude: currentMarker.current.lat - 0.003,
                    latitudeDelta: 0.010,
                    longitudeDelta: 0.010,
                },
                500)
        }

    }, [isDrawerOpened])

    const openDrawer = (marker: any) => {
        currentMarker.current = marker;

        setDrawerOpened(true);
    };

    const closeDrawer = () => {
        setDrawerOpened(false)
    };


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

                    {!loading && (
                        data.routes.map((marker: any) => {
                            return <Marker
                                key={marker.title}
                                coordinate={{
                                    latitude: marker.lat,
                                    longitude: marker.lng,
                                }}

                                title={marker.title}
                                onPress={() => openDrawer(marker)}

                            >
                                <Image
                                    style={{width: 40, height: 40, borderRadius: 100}}
                                    src={marker.hero.picture}
                                />
                            </Marker>
                        }))}
                </MapView>
            )}
            {isDrawerOpened && <CustomBottomDrawer onClose={closeDrawer}>
                <MarkerDetails propsData={currentMarker.current}
                               navigation={navigation}
                               closeDrawer={closeDrawer}
                />
            </CustomBottomDrawer>}
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