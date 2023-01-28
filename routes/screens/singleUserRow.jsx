import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';

import {
    createTable,
    insertUser,
    getUser,
    deleteUser,
    getAllUsers,
    updateUser
} from '../../components/DBHandler';


import * as SQLite from "expo-sqlite";
import { getPicture } from '../../components/CommunicationController';
import { SidContext } from '../../App';
function openDatabase() {
    const db = SQLite.openDatabase("db.db");
    return db;
}



const SingleUserRow = ({ item, navigation }) => {
    const sid = useContext(SidContext);
    const [state, setstate] = useState();
    useEffect(() => {
        console.log(item.pversion)
        if (item.pversion == 0) {
            console.log(item.pversion, "vale 0")
            return
        }
        //TODO: FUNZIONA MA MNACA LA GESTIONE DEL CAMPO PVERSION
        console.log("ciao")
        console.log("item+", item)

        getUser(item.uid)
            .then(result => {
                //
                //console.log("-->", result)
                //console.log("-->", result._array)
                //console.log("-->", result._array)
                if (result._array.length) {
                    console.log("immagine presente salvo sullo stato dal db")


                    //qquindi devo controla ilp ersions  se il pvesiio è ivrsovuol diie chemmagi 

                    //e poi faccio audate sul db

                    if (result.pversion < item.pversion) {
                        //se è minore allora devo fare update e pendere qulla nuova dalla 
                        //chiamata di rete e salvare sul db
                        
                        getPicture(sid, item.uid)
                            .then(res => {
                                updateUser(res.uid,res.picture,res.pversion)
                                setstate(res.picture)
                                //inserto into db
                            })

                    } else {
                        setstate(result._array[0].picture)
                        //console.debug("IMMAGINE", result._array.picture)
                        console.debug("IMMAGINE", result._array[0].picture)
                    }
                } else {

                    console.log("vuoto immagine non presente sul db")
                    //niente immagine nel db quindi faccio chiamata e salvo nel db
                    pictureHandler()
                }
                //prendere immagine dal db e impostarla sullo state */
            })
            .catch(err => {
                console.log("error", err)
                //chiamata di rete 
                pictureHandler()
            })


    }, []);

    const pictureHandler = () => {
        console.log("lo user:", item.name, "dentro pictureHandler")
        getPicture(sid, item.uid)
            .then(result => {
                //console.log(result)
                //setPic(result.picture)
                setstate(result.picture)
                insertUser(result.uid, result.picture, result.pversion, result.name)
                //inserto into db
            })
    }

    return (
        <View>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('BachecaUtente', {
                    uid: item.uid,
                    name: item.name
                })}
            >

                <Image
                    style={styles.logo}
                    source={{
                        uri: 'data:image/png;base64,'+state,
                    }}
                />

                <Text>
                    {item.uid}
                    {item.name}
                    {item.pversion}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    logo: {
        width: 66,
        height: 58,
    },
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
})

export default SingleUserRow;
