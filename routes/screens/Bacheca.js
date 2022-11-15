import { StyleSheet, Button, Text, View } from 'react-native';
import { useContext } from 'react';
import { SidContext } from '../../App';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, FlatList, StatusBar } from 'react-native';
import Twok from '../../components/Twok';
/* 
• Bacheca dei twok. Una schermata mostra, uno per volta, i twok creati da altri utenti e 
forniti dal server. L’utente può anche vedere l’autore del twok (immagine e nome)
*/

const DATA = [1, 2, 3, 4];
const Bacheca = ({ navigation }) => {
    const {sid,setSid} = useContext(SidContext);
    const [mapAut, SetmapAut] = useState(new Map());
   // const [getSid, setSid] = useState(sid);
    
    //const fun = () => 

    
    useEffect(() => {
        console.log(sid)
        
        //setSid(sid)
      });
    
    //const sid = useContext(SidContext);
    //const sid = 'GbmE6bCvAZ7POxsOuxMq'

    const renderItem = ({ item }) => (
        <Twok

            tid={item}
            sid={sid}
            auts={mapAut}
            onLoadPicture={SetmapAut}
        />

    );

    return (
        <SafeAreaView style={styles.container}>
            {
                sid ? (
                  
                    <View>
                        <Text>CIAO</Text>
                        <Text>{sid}</Text>
                        <Text>{sid}</Text>
                        <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={(item) => item}
            />
                    </View>
                ) : (
                    <Text>LOADING USERS</Text>
                )
            }
            {/* <Text>{getSid}</Text>
            <Text>CIAO</Text>
            <Text>{getSid}</Text>
            <Text>Bacheca</Text>
            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={(item) => item}
            /> */}
            <Button
                title="Go to Details"
                onPress={() => navigation.navigate('BachecaUtente')}
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

