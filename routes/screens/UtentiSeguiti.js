import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, FlatList, TouchableOpacity, Alert } from 'react-native';

import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getFollowed } from '../../components/CommunicationController';
import { SidContext } from '../../App';
import SingleUserRow from './singleUserRow';
import CheckInternet from "../../components/CheckInternet";


const UtentiSeguiti = ({ navigation }) => {
    const [isConnected, setIsConnected] = useState(false)


    const [follow, setFollow] = useState(false)

    const sid = useContext(SidContext);
    //const sid = 'SjNbAP37WQ8SkYhchzL8'

    useFocusEffect(
        React.useCallback(() => {
            console.log('onFocus')
            //alert('Screen was focused');
            //onLoad()
            // Do something when the screen is focused
            return () => {
                //alert('Screen was unfocused');
                // Do something when the screen is unfocused
                // Useful for cleanup functions
            };
        }, [])
    );

    useEffect(() => {
        console.log('effect')
        onLoad()
        //sid ? onLoad() : ''
        //follow ? console.log('ramo 1') : alert();
    }, []);

    const onLoad = () => {
        console.log(sid)
        getFollowed(sid)
            .then(result => {
                setFollow(result)
                console.log(result)
                result.length ? console.log('ramo 1') : alert();
                return
            }).catch(error => {
                console.log("errore getFollowed US")
            alert("errore getFollowed US")
        })

    }



    const alert = () => {
        console.log("FOLLOW", follow)
        Alert.alert(
            'NON SEGUI NESSUNO!!',
            'Tornare alla Bacheca??',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: "cancel"
                },
                { text: "OK", onPress: () => navigation.navigate('Bacheca') }
            ]
        )
    }


    const renderItem = ({ item }) => (
        //console.log(item)
        <View>
            <SingleUserRow
                item = {item} 
                navigation = {navigation}
            />
        </View>
        
        /* {/* <View style={styles.card}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('BachecaUtente', {
                    uid: item.uid,
                    name: item.name
                })}
            >

                

                <Text>
                    {item.uid}
                    {item.name}
                    {item.pversion}
                </Text>
            </TouchableOpacity>
        </View> }*/
    );

    return (
        <View>

            {
                follow.length ? (
                    <View>
                        <FlatList
                            data={follow}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.uid}
                        />
                    </View>) : (
                    <View>
                        <Text>IS LOADING</Text>
                        <ActivityIndicator />
                    </View>)
            }
            <CheckInternet
                isConnected={isConnected}
                setIsConnected={setIsConnected}
            />
        </View>
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
export default UtentiSeguiti;
