import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView, TouchableOpacity } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SidContext } from '../../App';
import { isFollowed, follow, unfollow } from '../../components/CommunicationController';


const BachecaUtente = ({ route, navigation }) => {

    const [isFollow, setFollow] = useState();
    const sid = useContext(SidContext);
    const { uid, name } = route.params;

    useEffect(() => {
        isFollowed(sid, uid)
            .then(result => {
                console.log(result)
                setFollow(result.followed)
            })
    }, []);

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
        <SafeAreaView>
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



            </View>
        </SafeAreaView>

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
