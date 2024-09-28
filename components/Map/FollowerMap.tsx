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
import MapViewDirections from "react-native-maps-directions";
import {BottomMapNav} from "./BottomMapNav";


const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const FollowerMap = ({navigation, route}: any) => {
    const [currentLocation, setCurrentLocation]: any = useState(null);
    const [initialRegion, setInitialRegion]: any = useState(null);
    let _mapView: any = useRef<MapView>(null);



    const startingPoint = route.params.propsData
    const points = route.params.data.route.points
    const [currentPoint, setCurrentPoint] = useState<number>(0);

    const goNextPoint = () => {
        setCurrentPoint((prev) => prev + 1);
    }

    useEffect(() => {
        if(currentLocation)
            _mapView.current.animateToRegion({
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
                latitudeDelta: 0.003,
                longitudeDelta: 0.003,
            }, 100)
    }, []);

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
                latitudeDelta: 0.003,
                longitudeDelta: 0.003,
            });
        };

        getLocation();
        navigation.setOptions({tabBarStyle: { display: 'none' }});
    }, []);

    return (
        <View style={styles.container}>
            {initialRegion && (
                <>
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
                        <>
                        <Marker coordinate={{latitude: currentLocation.latitude, longitude: currentLocation.longitude}}>
                            <Image
                                style={{width: 20, height: 20}}
                                source={require('../../assets/icons/current_location.png')}
                            />
                        </Marker>
                        <MapViewDirections
                            key={points[currentPoint].title}
                            mode={'WALKING'}
                            origin={{
                                latitude: currentLocation.latitude,
                                longitude: currentLocation.longitude
                            }}
                            destination={{
                                latitude: points[currentPoint].lat,
                                longitude: points[currentPoint].lng
                            }}
                            apikey={process.env.EXPO_PUBLIC_API_KEY!}
                        />
                        </>
                    )}
                </MapView>
                <BottomMapNav nextStation='Jakas stacja'
                              theme='Trasa historyczna'
                              duration={7000}
                              distanceLeft={5}
                />
                </>
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

export default  FollowerMap;