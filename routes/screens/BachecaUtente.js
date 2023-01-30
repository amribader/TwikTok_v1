import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView, TouchableOpacity } from 'react-native';

import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SidContext } from '../../App';
import { isFollowed, follow, unfollow } from '../../components/CommunicationController';
import ListaTwok from '../../components/ListaTwok';



const BachecaUtente = ({ route, navigation }) => {

    const [isFollow, setFollow] = useState();
    const sid = useContext(SidContext);
    const { uid, name } = route.params;
    const [map, SetMap] = useState(new Map());


    const [bool, setBol] = useState(false);

    useFocusEffect(
        React.useCallback(() => {

            /* isFollowed(sid, uid)
                .then(result => {
                    console.log(result)
                    setFollow(result.followed)
                }) */
                setBol(true)
            alert('Screen was focused');

            // Do something when the screen is focused
            return () => {
                alert('Screen was unfocused');
                route = null
                map.clear();
                setBol(false)
                //SetMap(new Map())
                // Do something when the screen is unfocused
                // Useful for cleanup functions
            };
        }, [])
    );

    /* useEffect(() => {
        isFollowed(sid, uid)
            .then(result => {
                console.log(result)
                setFollow(result.followed)
            })
    }, []); */

    useEffect(() => {
        isFollowed(sid, uid)
            .then(result => {
                console.log(result)
                setFollow(result.followed)
            })
    }, [route, navigation]);

    const check = () => {
        isFollowed(sid, uid)
            .then(result => {
                console.log(result)
                console.log(result.followed)
                setFollow(result.followed)
                return
            })
    }

    const followUser = () => {
        follow(sid, uid)
            .then(result => {
                console.log(result)
                check()
                return
            })
        //setFollow('true')
        /* .then(result => {
            console.log(result)
            setFollow(result)
        }) */
    }

    const unfollowUser = () => {
        unfollow(sid, uid)
            .then(result => {
                console.log(result)
                check()
                return
            })
        //check();
        //setFollow('false')
    }


    console.log(route.params)
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text>NOME{name}</Text>
                {
                    isFollow ? (<TouchableOpacity
                        style={styles.button}
                        onPress={unfollowUser}
                    >
                        <Text>UNFOLLOW</Text>
                    </TouchableOpacity>) : (
                        <TouchableOpacity
                            style={styles.button}
                            onPress={followUser}
                        >
                            <Text>FOLLOW</Text>
                        </TouchableOpacity>
                    )
                }

                {
                    bool ? (
                        <View>
                            <ListaTwok
                                sid={sid}
                                uid={uid}
                                map={map}
                                SetMap={SetMap}
                                navigation={navigation}
                            />
                        </View>
                    ) : (
                        <>
                        <Text>LOADING...</Text>
                        </>
                    )
                }



            </View>
        </SafeAreaView >

    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10
    },
})

export default BachecaUtente;
