import { StyleSheet, Button, Text, View, ScrollView } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, FlatList, StatusBar, Dimensions } from 'react-native';
import Twok from '../../components/Twok';
import ListaTwok from '../../components/ListaTwok';

//import TwokLoaderHelper from '../../components/TwokLoaderHelper';
import {SingleTwokLoaderHelper} from '../../components/TwokLoaderHelper';

import { getTwok } from '../../components/CommunicationController';
import { SidContext } from '../../App';
/* 
• Bacheca dei twok. Una schermata mostra, uno per volta, i twok creati da altri utenti e 
forniti dal server. L’utente può anche vedere l’autore del twok (immagine e nome)
*/
/* TODO: CREARE MAPPA IMMAGINI PROFILO */
const Bacheca = ({navigation}) => {
    //const sid = 'eWMFf6iZzJIizpmEbwqb'
    const sid = useContext(SidContext);
    const [mapAut, SetmapAut] = useState(new Map());
    
    const [getData, setData] = useState([]);
    const [bool, setBol] = useState(false);
    
    const [tidSequence, setTidSequence] = useState(1);
    
    useEffect(() => {
        sid ? setBol(true) : setBol(false)
    }, [sid]);

    
    const [map, SetMap] = useState(new Map());

    

    return (
        <SafeAreaView style={styles.container}>
            <>
            {
                bool ? (

                    <View>
                        <ListaTwok
                        sid={sid}
                        tid={tidSequence}
                        map={map}
                        SetMap={SetMap}
                        navigation={navigation}
                        />
                    </View>
                ) : (
                    <Text>LOADING USERS</Text>
                )

            }
            </>
        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    }
});


export default Bacheca;

