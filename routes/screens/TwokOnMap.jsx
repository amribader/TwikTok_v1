/*
 import React, { useState, useEffect } from "react"
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
             <MapView
                style={styles.map}
                initialRegion={region}
                provider="google"
            >
            {
                region ? (
                    <MapView style={styles.map} initialRegion={{ latitude: region.latitude, longitude: region.longitude }}>
                         <Marker
                            cordinate={region} title='Marker'
                        />
                    </MapView>
                ) : (
                    <Text>CARICAMENTO MAPPE IN CORSO</Text>
                )
            }

  <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
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
                <Circle center={pin} radius={1000} />
 </MapView>
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

import React, { useState, useEffect } from 'react';
import MapView, { Callout, Circle, Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Button, Alert } from 'react-native';
import * as Location from 'expo-location';
export default function TwokOnMap ({ navigation, route }) {
    const [pin, setPin] = useState({
        latitude: route.params.lat,
        longitude: route.params.lon
    })

    const [region, setRegion] = useState({
        latitude: route.params.lat,
        longitude: route.params.lon,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    })

    const userLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }
    }

    useEffect(() => {

        !route.params.lat && !route.params.lon ? alert() : '';

        userLocation();
        console.log(route.params)
        console.log(region)
    }, []);


    const alert = () => {
        Alert.alert(
            'QUESTO TWOK NON è GEOLOCALIZZATO!!',
            'Tornare alla Bacheca??',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: "cancel"
                },
                { text: "OK", onPress: () => navigation.goBack() }
            ]
        )
    }

    return (
        <View style={styles.container}>
{
    route.params.lat ? ( <>
        <View style={styles.viewButton}>
            <Text>CIAO A TUTTI</Text>

            <Button
                title="Back to Home"
                color="#841584"
                onPress={() => {
                    navigation.goBack()
                    console.log('BARRACUDA')
                    return
                }}
            />
        </View>

        <MapView initialRegion={region}
            provider="google" style={styles.map}
            zoomEnabled={true}
            zoomTapEnabled={true}
            zoomControlEnabled={true}
            rotateEnabled={true}
        >



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
            <Circle center={pin} radius={1000} />

        </MapView>
    </> ):(<Text>ERRORE</Text>)
}
           
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    viewButton: {
        //flex:2,
        marginTop: 40,
    },
    map: {
        //flex: 2,
        width: Dimensions.get('window').width,
        //height: (Dimensions.get('window').height),
        height: '90%',
        // marginTop: 180,
    },
});

/*

import { View, Text, Dimensions, StyleSheet } from 'react-native'
import React from 'react'

const TwokOnMap = () => {
  return (
    <View>
      <Text>TwokOnMap</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    viewButton: {
        //flex:2,
        marginTop: 40,
    },
    map: {
        //flex: 2,
        width: Dimensions.get('window').width,
        //height: (Dimensions.get('window').height),
        height: '90%',
        // marginTop: 180,
    },
});

export default TwokOnMap;

*/