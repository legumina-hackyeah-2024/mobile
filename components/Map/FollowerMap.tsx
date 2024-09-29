import React, { useEffect, useRef, useState } from "react";
import {Button, Dimensions, Image, StyleSheet, View} from "react-native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { BottomMapNav } from "./BottomMapNav";
import {useLazyQuery, useQuery} from "@apollo/client";
import {GET_ROUTES_BY_ID, GET_USER_ME} from "../../api/queries";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const FollowerMap = ({ navigation, route }: any) => {

    const [currentLocation, setCurrentLocation]: any = useState(null);
    const [initialRegion, setInitialRegion]: any = useState(null);
    const [elapsedTime, setElapsedTime] = useState<number>(0);
    let _mapView: any = useRef<MapView>(null);

    const startingPoint = route.params.propsData;
    const points = route.params.data.route.points;
    const [currentPoint, setCurrentPoint] = useState<number>(0);
    const [isClose, setIsClose] = useState<boolean>(false);
    const [totalDistanceLeft, setTotalDistanceLeft] = useState<number>(0);
    const [stage, setStage] = useState('next-station');

    const { data, loading, error } = useQuery(GET_USER_ME(startingPoint.id), {
        variables: { id: startingPoint.id },
        context: {
            headers: {
                Authorization: `Bearer ${process.env.EXPO_PUBLIC_JWT}`,
            },
        },
    });

    useEffect(() => {
        if(!data || loading) return;

        if(data && data.userMe.progressOfRoute.status === "Completed") {
            navigation.navigate('FinishScreen');
        }
            // setCurrentPoint(data.userMe.progressOfRoute.currentPointIdx);

    }, [data]);

    useEffect(() => {
        if(currentPoint === points.length) {
            navigation.navigate('FinishScreen');
        }

        if(stage === 'question') {
            setStage('task-complete');
        }

    }, [currentPoint])

    const goNextPoint = (nextPoint: number) => {
        if(currentPoint + 1 === points.length) {
            navigation.navigate('FinishScreen');
        }

        setCurrentPoint(nextPoint);
        setStage('next-station');
    };

    const goToExercise = () => {
        setStage('question');
    };

    const goToTaskComplete = (nextPoint: number) => {
        if(nextPoint === points.length) {
            navigation.navigate('FinishScreen');
        } else {
            setCurrentPoint(nextPoint);
        }
    };

    const calculateTotalDistanceLeft = (currentLocation: any, points: any[], currentPoint: number) => {
        let totalDistance = 0;
        let startPoint = currentLocation;

        for (let i = currentPoint; i < points.length; i++) {
            const endPoint = points[i];
            totalDistance += calculateDistance(startPoint.latitude, startPoint.longitude, endPoint.lat, endPoint.lng);
            startPoint = { latitude: endPoint.lat, longitude: endPoint.lng };
        }

        return totalDistance;
    };

    const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
        const R = 6371;
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    useEffect(() => {
        if (currentLocation && points.length > 0 && points[currentPoint]) {
            const distance = calculateDistance(
                currentLocation.latitude,
                currentLocation.longitude,
                points[currentPoint].lat,
                points[currentPoint].lng
            );

            if (distance < 0.05) {
                setIsClose(true);
                setStage('close');
            } else {
                setStage('next-station');
                setIsClose(false);
            }

            _mapView.current?.animateToRegion({
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
                latitudeDelta: 0.003,
                longitudeDelta: 0.003,
            }, 500);

            const totalDistance = calculateTotalDistanceLeft(currentLocation, points, currentPoint);
            setTotalDistanceLeft(totalDistance);
        }
    }, [currentLocation, currentPoint, points]);

    useEffect(() => {
        let locationSubscription: any;

        const startLocationTracking = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== "granted") {
                console.error("Location permission not granted");
                return;
            }

            locationSubscription = await Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.High,
                    timeInterval: 500,
                    distanceInterval: 0.1,
                },
                (location) => {
                    setCurrentLocation(location.coords);

                    if (!initialRegion) {
                        setInitialRegion({
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                            latitudeDelta: 0.003,
                            longitudeDelta: 0.003,
                        });
                    }
                }
            );
        };

        startLocationTracking();

        return () => {
            if (locationSubscription) {
                locationSubscription.remove();
            }
        };
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setElapsedTime((prev) => prev + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <View style={styles.container}>
            {initialRegion && (
                <>
                    <MapView
                        style={styles.map}
                        initialRegion={initialRegion}
                        ref={(current) => {
                            _mapView.current = current;
                        }}
                        zoomTapEnabled
                        zoomControlEnabled
                        showsBuildings={false}
                        customMapStyle={mapStyle}
                    >
                        {(currentLocation && points[currentPoint]) && (
                            <>
                                {/* Dynamic current location marker */}
                                <Marker
                                    coordinate={{
                                        latitude: currentLocation.latitude,
                                        longitude: currentLocation.longitude,
                                    }}
                                >
                                    <Image
                                        style={{ width: 20, height: 20 }}
                                        source={require("../../assets/icons/current_location.png")}
                                    />
                                </Marker>

                                <Marker
                                    coordinate={{
                                        latitude: points[currentPoint].lat,
                                        longitude: points[currentPoint].lng,
                                    }}
                                >
                                    <Image
                                        style={{ width: 25, height: 32.5 }}
                                        source={require("../../assets/icons/map_destination_ping.png")}
                                    />
                                </Marker>
                                {points[currentPoint] && (
                                <MapViewDirections
                                    key={points[currentPoint].title}
                                    mode={"WALKING"}
                                    strokeWidth={4}
                                    strokeColor='#295046'
                                    origin={{
                                        latitude: currentLocation.latitude,
                                        longitude: currentLocation.longitude,
                                    }}
                                    destination={{
                                        latitude: points[currentPoint].lat,
                                        longitude: points[currentPoint].lng,
                                    }}
                                    apikey={process.env.EXPO_PUBLIC_API_KEY!}
                                />)}
                            </>
                        )}
                    </MapView>
                    <Button onPress={() => setStage('close')} title={'SKIP_BEING_CLOSE_LOGIC'}/>
                    <BottomMapNav
                        nextStation={points[currentPoint].title}
                        currentUserMe={data}
                        theme="Trasa historyczna"
                        description={points[currentPoint].description}
                        duration={elapsedTime}
                        stage={stage}
                        goNextStage={goToTaskComplete}
                        goToExercise={goToExercise}
                        goToTaskComplete={goToTaskComplete}
                        distanceLeft={Math.round(totalDistanceLeft * 100) / 100}
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
        height: Dimensions.get("window").height * 0.7,
    },
});

const mapStyle = [
    {
        featureType: "poi.business",
        elementType: "labels.text.fill",
        stylers: [
            {
                visibility: "off",
            },
        ],
    },
    {
        featureType: "poi.business",
        elementType: "labels.text.stroke",
        stylers: [
            {
                visibility: "off",
            },
        ],
    },
];

export default FollowerMap;
