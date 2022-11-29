import React, { Component, useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, Platform } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import { getPicture } from './CommunicationController';
import { SidContext } from '../App';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as SQLite from "expo-sqlite";

const Twok = ({ item, auts, onLoadPicture, navigation }) => {
  const sid = useContext(SidContext);
  let [fontsLoaded] = useFonts({
    'Anton-Regular': require('../assets/font/Anton-Regular.ttf'),
    'BhuTukaExpandedOne': require('../assets/font/BhuTukaExpandedOne-Regular.ttf'),
    'DancingScript': require('../assets/font/DancingScript-VariableFont_wght.ttf'),
  })

  const [state, setstate] = useState();



  function openDatabase() {
    if (Platform.OS === "web") {
      return {
        transaction: () => {
          return {
            executeSql: () => { },
          };
        },
      };
    }

    const db = SQLite.openDatabase("db.db");
    return db;
  }

  const db = openDatabase();
 /*
  useEffect(() => {
    console.log('Use effect')
    //SELECT name FROM sqlite_master WHERE type='table' AND name='getPicture';
    //create table if not exists getPicture (uid integer primary key not null, nome string, pversion int, picture base64);"
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='getPicture';", [],
        (tx, result) => { console.log(JSON.stringify(result.rows)) },
        (tx, error) => { console.log("ciao"+error) }
      );
    });

  }, []);
*/

  useEffect(() => {
    fetchData()
  }, []);
 
   const fetchData = () => {
    db.transaction(tx => {
      // sending 4 arguments in executeSql
      tx.executeSql("SELECT name FROM sqlite_master WHERE type='table' ", null, // passing sql query and parameters:null
        // success callback which sends two things Transaction object and ResultSet Object
        //(txObj, { rows: { _array } }) => console.log({ data: _array }), 
        (tx, result) => { console.log(JSON.stringify(result.rows)) },
        // failure callback which sends two things Transaction object and Error
        (txObj, error) => console.log('Error ', error)
        ) // end executeSQL
    }) // end transaction
  }

  /* TODO: NIENTE SIMBONO MAPPA SE NON CE EFFETTIVAMENTE */
  useEffect(() => {
    getPicture(sid, item.uid)
      .then(result => { setstate(result.picture) })

    //const item = await second.json();
    console.log(item);
    /* auts.has(result.uid)
      ? null
      : onLoadPicture(auts.set(result.uid, item.picture));
    SetResult(result); */
    //console.log(auts);
    //console.log(result);


  }, []); ///array delle dipendenze

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const add = (text) => {
    // is text empty?
    if (text === null || text === "") {
      return false;
    }

    db.transaction(
      (tx) => {
        tx.executeSql("insert into items (done, value) values (0, ?)", [text]);
        tx.executeSql("select * from items", [], (_, { rows }) =>
          console.log(JSON.stringify(rows))
        );
      },
      null,
      forceUpdate
    );
  };

  //console.log(item)
  const textAlignmentsVertical = ["flex-start", "center", "flex-end"];
  const textAlignments = ["left", "center", "right"];
  //const textAlignments = ["flex-start", "center", "flex-end"]
  const fontWeights = [18, 30, 44];
  const fontType = ['BhuTukaExpandedOne', 'DancingScript', 'Anton-Regular']
  return (

    <View onLayout={onLayoutRootView}
      style={[
        styles.twokStyle,
        {
          backgroundColor: `#${item.bgcol}`,
          justifyContent: textAlignmentsVertical[item.valign]
        }]}>
      <Text
        style={{
          fontSize: fontWeights[item.fontsize],
          fontFamily: fontType[item.fonttype],
          fontStyle: fontType[item.fonttype],
          textAlign: textAlignments[item.halign],
          color: `#${item.fontcol}`
        }}>{item.text}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('BachecaUtente', {
          uid: item.uid,
          name: item.name
        })}
      >
        {state ? (<View style={[
          {
            justifyContent: textAlignmentsVertical[item.valign],
            //alignItems: textAlignments[item.halign]
          }]}><Image
            source={{ uri: "data:image/png;base64," + state }}
            /* style={{ width: 200, height: 200 }} */
            style={styles.image}
          /></View>) : (<><MaterialCommunityIcons name="account-circle" color={'black'} size={100} /></>)}
      </TouchableOpacity>

      {
        item.lat ? (<View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('TwokOnMap', {
              uid: item.uid,
              name: item.name,
              lat: item.lat,
              lon: item.lon,
            })}
          >
            <MaterialCommunityIcons name="google-maps" color={'black'} size={100} />
          </TouchableOpacity>
        </View>) : (
          <></>
        )


      }


    </View>
  );
}

const styles = StyleSheet.create({
  twokStyle: {
    width: "100%",
    height: Dimensions.get('window').height,
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
});

export default Twok;