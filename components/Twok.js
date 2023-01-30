import React, { Component, useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, Platform, Button } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import { getPicture } from './CommunicationController';
import { SidContext } from '../App';
import { MaterialCommunityIcons } from '@expo/vector-icons';


import { useHeaderHeight } from '@react-navigation/elements';

import {
  createTable,
  insertUser,
  getUser,
  deleteUser,
  getAllUsers,
  updateUser
} from './DBHandler';

import * as SQLite from "expo-sqlite";


import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { useFocusEffect } from '@react-navigation/native';
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
  const [pic, setPic] = useState();
  const [selectDB, setSelectDB] = useState();

  const db = openDatabase();

  useFocusEffect(
    React.useCallback(() => {
        
        //alert('Screen was focused');
        
        // Do something when the screen is focused
        return () => {
            //alert('Screen was unfocused');
            
            setstate(null)
            setPic(null)
            // Do something when the screen is unfocused
            // Useful for cleanup functions
        };
    }, [])
);




  useEffect(() => {
    console.log(item.pversion)
    if(item.pversion===0){
      setstate(null)
      console.log(item.pversion,"vale 0")
      return
    }
//TODO: FUNZIONA MA MNACA LA GESTIONE DEL CAMPO PVERSION
    console.log("ciao")
    console.log("item+",item)
    getUser(item.uid)
      .then(result => {
        //console.log("-->", result)
        //console.log("-->", result._array)
        if(result._array.length){

            //qquindi devo controla ilp ersions  se il pvesiio è ivrsovuol diie chemmagi

            //e poi faccio audate sul db
            console.log("immagine presente salvo sullo stato dal db")
            if (result.pversion < item.pversion) {
                //se è minore allora devo fare update e pendere qulla nuova dalla
                //chiamata di rete e salvare sul db
                console.log("immagine che ho sul db è vecchia faccio una chiamata al server per recuperare quella più recente")
                getPicture(sid, item.uid)
                    .then(res => {
                        updateUser(res.uid, res.picture, res.pversion)
                        setstate(res.picture)

                        if (res.picture.substring(0, 4) === "file") {
                            console.log("formato immagine errato file:")
                            setstate(null)
                        }
                        //inserto into db
                    })
                    .catch(error => alert("Errore Twok getTwok"+error))


            }else{
                console.log("immagine sul db è la più recente la prendo e la setto dul db")
                setstate(result._array[0].picture)

                console.debug("IMMAGINE", result._array.picture)
            }


        }else{
          //todo in teoria questo ramo andreppe tolto è ridondante
          console.log("vuoto immagine non presente sul db")
          //niente immagine nel db quindi faccio chiamata e salvo nel db
          pictureHandler()
        }
        //prendere immagine dal db e impostarla sullo state
      })
      .catch(err => {
        console.log("error", err)
        //chiamata di rete 
        pictureHandler()
      })
    /* 
     */
  }, []);

  const pictureHandler = () => {
    console.log("lo user:",item.name,"dentro pictureHandler")
    getPicture(sid, item.uid)
      .then(result => {
        //console.log(result)
        setPic(result.picture)
        setstate(result.picture)
        insertUser(result.uid, result.picture, result.pversion, result.name)

          if (result.picture.substring(0, 4) === "file") {
              console.log("formato immagine errato file:")
              setstate(null)
          }
        //inserto into db
      })
        .catch(error => alert("Errore Twok getTwok"+error))

  }


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
              alignItems: textAlignmentsVertical[item.halign],
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
        item.lat ? (<View style={[
            {
                justifyContent: textAlignmentsVertical[item.valign],
                //alignItems: textAlignments[item.halign]
            }]}>
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