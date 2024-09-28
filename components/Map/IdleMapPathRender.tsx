import MapViewDirections from "react-native-maps-directions";
import {useQuery} from "@apollo/client";
import {GET_ROUTES, GET_ROUTES_BY_ID} from "../../api/queries";
import React from "react";
import MapView from "react-native-maps";
import {Dimensions, StyleSheet} from "react-native";

export function IdleMapPathRender({path, data, loading}: any) {

    if(loading)
        return <></>


    const renderPaths = (points: any) => {
        const ret = []
        for(let i=0; i < points.length - 1; i++ ){
            ret.push(<MapViewDirections
                key={points[i].title}
                mode={'WALKING'}
                origin={{
                    latitude: points[i].lat,
                    longitude: points[i].lng
                }}
                destination={{
                    latitude: points[i+1].lat,
                    longitude: points[i+1].lng
                }}
                apikey={process.env.EXPO_PUBLIC_API_KEY!}
            />);
        }

        return ret;
    }

    return <MapView style={styles.map}
                    zoomEnabled={false}
                    zoomTapEnabled={false}
                    initialRegion={{
                        longitude: path.lng,
                        latitude: path.lat,
                        latitudeDelta: 0.025,
                        longitudeDelta: 0.025
                    }}
                    onTouchMove={(event) => event.preventDefault()}
    >
        {renderPaths(data.route.points)}
    </MapView>

}

const styles = StyleSheet.create({
    map: {
        width: Dimensions.get('window').width * 0.8,
        height: Dimensions.get('window').height * 0.2
    }
})