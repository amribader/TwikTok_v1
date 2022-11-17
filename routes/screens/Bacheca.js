import { StyleSheet, Button, Text, View } from 'react-native';
import { useContext } from 'react';
import { SidContext } from '../../App';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, FlatList, StatusBar, Dimensions } from 'react-native';
import Twok from '../../components/Twok';
//import TwokLoaderHelper from '../../components/TwokLoaderHelper';
import {SingleTwokLoaderHelper} from '../../components/TwokLoaderHelper';
import { getTwok } from '../../components/CommunicationController';
/* 
• Bacheca dei twok. Una schermata mostra, uno per volta, i twok creati da altri utenti e 
forniti dal server. L’utente può anche vedere l’autore del twok (immagine e nome)
*/

/* const DATA = [
    {
        "uid": 23,
        "name": "Test1",
        "pversion": 1,
        "tid": 1,
        "text": "Twok di prova 1",
        "bgcol": "FFFFFF",
        "fontcol": "000000",
        "fontsize": 1,
        "fonttype": 1,
        "halign": 1,
        "valign": 1,
        "lat": 45,
        "lon": 34.34
    },
    {
        "uid": 24,
        "name": "Test2",
        "pversion": 1,
        "tid": 2,
        "text": "Twok di prova 2",
        "bgcol": "FFFFFF",
        "fontcol": "000000",
        "fontsize": 1,
        "fonttype": 1,
        "halign": 1,
        "valign": 1,
        "lat": 45,
        "lon": 34.34
    },
    {
        "uid": 25,
        "name": "Test2",
        "pversion": 1,
        "tid": 3,
        "text": "Twok di prova 3",
        "bgcol": "FFFFFF",
        "fontcol": "000000",
        "fontsize": 1,
        "fonttype": 1,
        "halign": 1,
        "valign": 1,
        "lat": 45,
        "lon": 34.34
    },
    {
        "uid": 23,
        "name": "Test1",
        "pversion": 1,
        "tid": 4,
        "text": "Twok di prova 4",
        "bgcol": "FFFFFF",
        "fontcol": "000000",
        "fontsize": 1,
        "fonttype": 1,
        "halign": 1,
        "valign": 1,
        "lat": 45,
        "lon": 34.34
    },
    {},
    {},
    {},
    {},
    {}
] */

//const DATA = [1, 2, 3, 4];
const Bacheca = ({ navigation }) => {
    //const sid = useContext(SidContext);
    const sid = 'eWMFf6iZzJIizpmEbwqb'
    const [mapAut, SetmapAut] = useState(new Map());
    const [getData, setData] = useState([]);
    //const sid = useContext(SidContext);
    //const sid = 'GbmE6bCvAZ7POxsOuxMq'
    const [tidSequence, setTidSequence] = useState(1);
    // const [getSid, setSid] = useState(sid);

    //const fun = () => 


    useEffect(() => {
        //console.log(sid)
        //console.log({ sid, tidSequence })
        //TwokLoaderHelper(sid, tidSequence)
        SingleTwokLoaderHelper(sid, tidSequence)
            .then(result => {
                //setData(result)
                console.log(result)
                getData.push(result)
                setTidSequence(tidSequence+1)
                /* console.log(tidSequence)
                console.log(getData.length) */
                return
            })
    }, []);//array delle dipendenze

    /* Dowload data when scrolling flatlist */
    /* const fun = () => {
        getTwok(sid, tidSequence)
            .then(result => {
                getData.push(result)
            })
    } */

    const fun = () => {
        SingleTwokLoaderHelper(sid, tidSequence)
            .then(result => {
                getData.push(result)
            })
    }
    

    const renderItem = ({ item }) => (
        //console.log(item)
        <Twok
            item={item}
        />

    );

    return (
        <SafeAreaView style={styles.container}>

            {
                getData ? (

                    <View>
                        <FlatList
                            //data={Array.from(mapData.values())}
                            data={getData}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.tid}
                            snapToInterval={Dimensions.get('window').height}
                            snapToAlignment="start"
                            decelerationRate="fast"
                            //onScrollEndDrag={fun}
                        />
                    </View>
                ) : (
                    <Text>LOADING USERS</Text>
                )

            }
            <Button
                title="Go to Details"
                onPress={fun}
            />
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

