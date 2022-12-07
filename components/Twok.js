import React, { Component, useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, Platform, Button } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import { getPicture } from './CommunicationController';
import { SidContext } from '../App';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as SQLite from "expo-sqlite";


import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
function openDatabase() {
  const db = SQLite.openDatabase("db.db");
  return db;
}
const Twok = ({ item, auts, onLoadPicture, navigation }) => {
  const sid = useContext(SidContext);
  let [fontsLoaded] = useFonts({
    'Anton-Regular': require('../assets/font/Anton-Regular.ttf'),
    'BhuTukaExpandedOne': require('../assets/font/BhuTukaExpandedOne-Regular.ttf'),
    'DancingScript': require('../assets/font/DancingScript-VariableFont_wght.ttf'),
  })

  const [state, setstate] = useState();
  const [selectDB, setSelectDB] = useState();




  

  const db = openDatabase();
  /*
  useEffect(() => {
/*     db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists DBprova2 (uid integer primary key not null, nome string, pversion int, picture base64);",
        [],
        () => {
          console.log("Users table created successfully");
        },
        (error) => {
          console.error("Error creating users table", error);
        }
      );
    }); */
  /*
    getPicture(sid, item.uid)
      .then(result => {
        //console.log(result)
        setstate(result.picture)
        //setObj(result)
        //console.log("ciao->",obj.uid, obj.name, obj.pversion)
        console.log("ciao->",result.uid, result.name, result.pversion)
        add(result.uid, result.name, result.pversion)
        //add(result.uid, result.name, result.pversion)  //uid , nome, pversion
      })
  
  }, [state]);


  const add = (uid, nome, pversion) => {
    console.log(state)
    //!(state && nome && pversion) ? console.log("ERRORE RICHIESTA INVALIDA") : '';
    console.log("->",uid, nome, pversion)
    state ? console.log("immagine presente"): console.log("immagine NON presente")
    if(!(state && nome && pversion)){
      console.log("ERRORE RICHIESTA INVALIDA")
      return
    }
    console.log("ADD->",uid, nome, pversion)
    db.transaction(
      (tx) => {

        tx.executeSql(`select * from DBprova2 where uid==${uid} `, [],  // passing sql query and parameters:null
        // success callback which sends two things Transaction object and ResultSet Object
        (txObj, { rows: { _array } }) => {
          console.log(_array)
          setSelectDB(_array) 
        },
        // failure callback which sends two things Transaction object and Error
        (txObj, error) => {console.log('Error ', error)}
        ); 
/*
        tx.executeSql("insert or replace into DBprova2 (uid , nome, pversion , picture) values (?,?,?,?)", [uid, nome, pversion, state]
        ,
      () => {
        console.log("insert table created successfully");
      },
      (error) => {
        console.error("insert table users table", error);
      });
*/

        //tx.executeSql("insert or ignore into getPicture3 (uid , nome, pversion , picture) values (21,'gianni',1,'9j4AAQSkZJRgABAQAAAQABAAD2wBDA')");
        /* 
        tx.executeSql("select * from getPicture", [],
          (tx, result) => { console.log(JSON.stringify(result.rows)) }) */
/*
           
      }

*/
      //null,
      //forceUpdate
      /*
    );
    console.log(selectDB);
    console.log(selectDB.length);
    console.log(typeof(selectDB));
      if(selectDB.length){
        console.log();
      }
    /* db.transaction((tx) => {
      tx.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table';", [],
        (tx, result) => { console.log(":",JSON.stringify(result.rows)) },
        (tx, error) => { console.log("ciao" + error) }
      );
    }); */
    /*
  };
  */
  /*
   useEffect(() => {
     console.log('Use effect')
     //SELECT name FROM sqlite_master WHERE type='table' AND name='getPicture';
     //create table if not exists getPicture (uid integer primary key not null, nome string, pversion int, picture base64);"
     db.transaction((tx) => {
       tx.executeSql(
         "create table if not exists getPicture3 (uid integer primary key not null, nome string, pversion int, picture base64);"
         /*, [],
         (tx, result) => { console.log(JSON.stringify(result.rows)) },
         (tx, error) => { console.log("ciao"+error) }
       );
     });
 
   }, []);
 */
  /*   useEffect(() => {
      db.transaction((tx) => {
        tx.executeSql(
          "create table if not exists getPicture (uid integer primary key not null, nome string, pversion int, picture base64);"
        );
      });
    }, []); */

  /*   useEffect(() => {
      //fetchData()
    }, []); */
/*
  const fetchData = () => {
    console.log("fetch")
    db.transaction(tx => {
      // sending 4 arguments in executeSql
      tx.executeSql("create table if not exists getPicture (uid integer primary key not null, nome string, pversion int, picture base64);' ")
      /*
      , null, // passing sql query and parameters:null
        // success callback which sends two things Transaction object and ResultSet Object
        (tx, { rows: { _array } }) => console.log({ data: _array }), 
        /* (tx, result) => { 
          const res = JSON.stringify(result.rows)
          console.log(res)
          console.log(res.length)
          console.log(JSON.stringify(result.rows)) 
        }, 
        // failure callback which sends two things Transaction object and Error
        (txObj, error) => console.log('Error ', error)
        ) // end executeSQL
        *//*
    }) // end transaction
  }
  */
  /*
    /* TODO: NIENTE SIMBONO MAPPA SE NON CE EFFETTIVAMENTE */

/*   useEffect(() => {
    /*
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists DBprova2 (uid integer primary key not null, nome string, pversion int, picture base64);"
      );
    });
*//* 
    console.log("picture")
    getPicture(sid, item.uid)
      .then(result => {
        //console.log(result)
        setstate(result.picture)
        setObj(result)
        //add(obj.uid , obj.name, obj.pversion)
        //add(result.uid, result.name, result.pversion)  //uid , nome, pversion
      }) */
    //add(obj.uid , obj.nome, obj.pversion)  //uid , nome, pversion

    //const item = await second.json();
    //console.log(item);
    /* auts.has(result.uid)
      ? null
      : onLoadPicture(auts.set(result.uid, item.picture));
    SetResult(result); */
    //console.log(auts);
    //console.log(result);

/* 
  }, []); ///array delle dipendenze */
 
  const fun = async () => {
    console.log("fun")
    await Sharing.shareAsync(
      FileSystem.documentDirectory + 'SQLite/db.db',
      { dialogTitle: 'share or copy your DB via' }
    ).catch(error => {
      console.log(error);
    })
  }


  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }



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
        }}>{item.text}{"\n"}{item.name}</Text>
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
          /></View>) : (<View style={[
            {
              justifyContent: textAlignmentsVertical[item.valign],
              //alignItems: textAlignments[item.halign]
            }]}><MaterialCommunityIcons name="account-circle" color={'black'} size={100} /></View>)}
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

      <Button
        //onPress={() => add(obj.uid , obj.name, obj.pversion)}
        onPress={fun}
        title="premi"
      >
      </Button>
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