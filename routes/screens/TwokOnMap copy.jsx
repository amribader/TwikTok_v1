/* import React, { useState, useEffect } from "react"
import { Dimensions, StyleSheet, Text, View } from "react-native"
import MapView, { Callout, Circle, Marker } from "react-native-maps"

import * as Location from 'expo-location';
export default function TwokOnMap({ navigation, route }) {
    const [pin, setPin] = useState({
        latitude: route.params.lat,
        longitude: route.params.lon
    })

    const [region, setRegion] = useState({
        latitude: 37.78825,
		longitude: -122.4324,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421
    })

    console.log(route.params)

    const userLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }
    }

    useEffect(() => {
        userLocation();
        console.log(route.params)
        console.log(region)
    }, []);

    return (
        <View style={{ marginTop: 50, flex: 1 }}>
            {/* <MapView
                style={styles.map}
                initialRegion={region}
                provider="google"
            > }
/*             {
                region ? (
                    <MapView style={styles.map} initialRegion={{ latitude: region.latitude, longitude: region.longitude }}>
                        {/* <Marker
                            cordinate={region} title='Marker'
                        /> *
                    </MapView>
                ) : (
                    <Text>CARICAMENTO MAPPE IN CORSO</Text>
                )
            }
 */
            {/*  <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
                <Marker
                    coordinate={pin}
                    pinColor="black"
                    draggable={true}
                    onDragStart={(e) => {
                        console.log("Drag start", e.nativeEvent.coordinates)
                    }}
                    onDragEnd={(e) => {
                        setPin({
                            latitude: e.nativeEvent.coordinate.latitude,
                            longitude: e.nativeEvent.coordinate.longitude
                        })
                    }}
                >
                    <Callout>
                        <Text>I'm here</Text>
                    </Callout>
                </Marker>
                <Circle center={pin} radius={1000} /> */}
            {/* </MapView> */}/* 
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    },
    map: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height
    }
})
 
*/

import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, FlatList, TouchableOpacity, Alert, SafeAreaView } from 'react-native';

import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getFollowed } from '../../components/CommunicationController';
import { SidContext } from '../../App';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps'

const TwokOnMap = ({ navigation, route }) => {
    console.log(route.params)
    const [mapRegion, setMapRegion] = useState({
        latitudine: route.params.lat,
        latitudine: route.params.lon
    })

    const sid = useContext(SidContext);
    //const sid = 'SjNbAP37WQ8SkYhchzL8'


    const userLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }
        
        let location = await Location.getCurrentPositionAsync({
            enableHighAccuracy: true
        });

        setMapRegion({
            latitude: location.coords.latitude,
            latitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        });
        console.log(location.coords.latitude, location.coords.longitude);
    }

    useEffect(() => {
        userLocation();
    }, []);

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <MapView style={styles.map} region={mapRegion}>
                    <Marker
                        cordinate={mapRegion} title='Marker'
                    />
                </MapView>
            </View>

        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    textStyle: {
        fontSize: 40,
        fontWeight: "700"
    },
    image: {
        width: 100,
        height: 50,
        resizeMode: 'contain',
    },
    card: {
        flexDirection: 'row',
        textAlign: 'center',
        borderColor: 'green',
        borderRadius: 3,
        borderWidth: 2
    },
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10
    },
});
export default TwokOnMap;