import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView, TextInput, ScrollView, View, Text, TouchableOpacity, StyleSheet, Slider, Dimensions, KeyboardAvoidingView, Button, Alert } from 'react-native';
//import { TextInput } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import { addTwok } from '../../components/CommunicationController';
import { SidContext } from '../../App';



import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const CreaTwok = ({ navigation }) => {

  let [fontsLoaded] = useFonts({
    'Anton-Regular': require('../../assets/font/Anton-Regular.ttf'),
    'BhuTukaExpandedOne': require('../../assets/font/BhuTukaExpandedOne-Regular.ttf'),
    'DancingScript': require('../../assets/font/DancingScript-VariableFont_wght.ttf'),
  })

  const sid = useContext(SidContext);

  const [getText, setText] = useState('');
  const [fontDimOpen, setFontDimOpen] = useState(false);

  //const [fontSize, setFontSize] = useState(10);

  const [open, setOpen] = useState(false);


  const [fontDimValue, setFontDimValue] = useState(18);

  const [fontTypeValue, setFontTypeValue] = useState('BhuTukaExpandedOne');

  const [fontDim, setFontDim] = useState([
    { label: 'Piccolo', value: 18 },
    { label: 'Medio', value: 30 },
    { label: 'Grande', value: 44 }
  ]);

  /*   const [fontType, setFontType] = useState([
      { label: 'normal', value: 'normal' },
      { label: 'italic', value: 'italic' },
      { label: 'Anton-Regular', value: 'Anton-Regular' }
    ]); */

  const [fontType, setFontType] = useState([
    { label: 'BhuTukaExpandedOne', value: 'BhuTukaExpandedOne' },
    { label: 'DancingScript', value: 'DancingScript' },
    { label: 'Anton-Regular', value: 'Anton-Regular' }
  ]);

  ////////////////////////////////////////////////////////////////////////////////////
  const [fontHorizontalOpen, fontHorizontalSetOpen] = useState(false);
  const [fontHorizontalValue, setFontHorizontalValue] = useState('center');
  const [fontHorizontal, setFontHorizontal] = useState([
    { label: 'Sinistra', value: 'left' },
    { label: 'Centro', value: 'center' },
    { label: 'Destra', value: 'right' }
  ]);

  ////////////////////////////////////////////////////////////////////////////////////////////////R
  const [fontVerticalOpen, fontVerticalSetOpen] = useState(false);
  const [fontVerticalValue, setFontVerticalValue] = useState('center');
  const [fontVertical, setFontVertical] = useState([
    { label: 'Alto', value: 'flex-start' },
    { label: 'Centro', value: 'center' },
    { label: 'Basso', value: 'flex-end' }
  ]);

  const backgroundColors = ['#000000', '#888888', '#ed1c24', '#d11cd5', '#1633e6', '#00aeef', '#00c85d', '#57ff0a', '#ffde17', '#f26522'];
  const [color, setColor] = useState(backgroundColors[0]);
  const [fontColor, setFontColor] = useState(backgroundColors[0]);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  const renderColor = (set) => {
    return backgroundColors.map(color => {
      return (
        <TouchableOpacity
          key={color}
          style={[styles.colorSelect, { backgroundColor: color }]}
          onPress={() => {
            console.log(color)
            set(color)
            return
          }}
        />
      )
    })
  }



  const handleCreateTwok = () => {
    const text = getText;
    const bgcol = color.substring(1);
    const fontcol = fontColor.substring(1);
    fontDimValue == 18 ? fontsize = 0 : (fontDimValue == 30 ? fontsize = 1 :  fontsize = 2)
    //const fonttype = fontTypeValue;
    fontTypeValue == 'BhuTukaExpandedOne' ? fonttype = 0 : (fontTypeValue == 'DancingScript' ? fonttype = 1 :  fonttype = 2)
    //const halign = fontHorizontalValue;
    fontHorizontalValue == 'left' ? halign = 0 : (fontHorizontalValue == 'center' ? halign = 1 :  halign = 2)
    //const valign = fontVerticalValue;
    fontVerticalValue == 'left' ? valign = 0 : (fontVerticalValue == 'center' ? valign = 1 :  valign = 2)

    const lat = '';
    const lon = '';

    console.log({sid,
      text,
      bgcol,
      fontcol,
      fontsize,
      fonttype,
      halign,
      valign,
      lat,
      lon}) 
     addTwok(sid,
      text,
      bgcol,
      fontcol,
      fontsize,
      fonttype,
      halign,
      valign)
    .then((result) => {
      console.log(result)
      Alert.alert(
        'Twok creato con successo!!',
        'Tornare alla Bacheca??',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: "cancel"
        },
        { text: "OK", onPress: () => navigation.navigate('Bacheca') }
      ]
    );
      
    });  
/*
    sid: sid,
        text: text,
        bgcol: bgcol,
        fontcol: fontcol,
        fontsize: fontsize,
        fonttype: fonttype,
        halign: halign,
        valign: valign,
        lat: lat,
        lon: lon,
        */
  };
  return (
    //<KeyboardAvoidingView style={styles.container} behavior="padding">
    //<ScrollView>
    <KeyboardAvoidingView>
      <ScrollView onLayout={onLayoutRootView} behavior="padding" style={{ margin: 25 }} /* style={styles.container} */>

        <Text style={{ fontFamily: 'Anton-Regular', fontSize: 40, alignSelf: 'center' }}>CREAZIONE TWOK</Text>
        <TextInput
          style={styles.input}
          label="Inserisci Testo Twok"
          value={getText}
          onChangeText={text => setText(text)}
        />
        {getText ? (
          <View style={[styles.twokStyle, { backgroundColor: color, justifyContent: fontVerticalValue }]}>
            <Text style={{ fontSize: fontDimValue, fontFamily: fontTypeValue, fontStyle: fontTypeValue, textAlign: fontHorizontalValue, textAlignVertical: fontVerticalValue, alignItems: fontVerticalValue, justifyContent: fontVerticalValue, color: fontColor }}>{getText}</Text>
          </View>

        ) : (
          <></>
        )}

        <View>
          <Text></Text>
          <Text>Font Color</Text>

          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 12, margin: 0 }}>
            {renderColor(setFontColor)}
          </View>

        </View>

        <View style={[styles.ComboBoxRow, {}]}>



          {/* FONT DIMENSIONI */}
          <DropDownPicker
            style={{
              backgroundColor: "crimson"
            }}
            disabledStyle={{
              opacity: 0.5
            }}
            textStyle={{
              fontSize: 15
            }}
            labelStyle={{
              fontWeight: "bold"
            }}
            containerStyle={{
              width: '40%',
            }}
            open={fontDimOpen}
            value={fontDimValue}
            items={fontDim}
            setOpen={setFontDimOpen}
            setValue={setFontDimValue}
            setItems={setFontDim}
          />




          {/* FONT TYPE */}
          <DropDownPicker
            style={{
              backgroundColor: "crimson"
            }}
            disabledStyle={{
              opacity: 0.5
            }}
            textStyle={{
              fontSize: 15
            }}
            labelStyle={{
              fontWeight: "bold"
            }}
            containerStyle={{
              width: '40%',
            }}
            open={open}
            value={fontTypeValue}
            items={fontType}
            setOpen={setOpen}
            setValue={setFontTypeValue}
            setItems={setFontType}
          />



        </View>

        <View style={[styles.ComboBoxRow, {}]} >
          {/* FONT HORIZONTAL */}
          <DropDownPicker
            style={{
              backgroundColor: "green"
            }}
            disabledStyle={{
              opacity: 0.5
            }}
            textStyle={{
              fontSize: 15
            }}
            labelStyle={{
              fontWeight: "bold"
            }}
            containerStyle={{
              width: '40%',
            }}
            open={fontHorizontalOpen}
            value={fontHorizontalValue}
            items={fontHorizontal}
            setOpen={fontHorizontalSetOpen}
            setValue={setFontHorizontalValue}
            setItems={setFontHorizontal}
          />

          {/* FONT HORIZONTAL */}
          <DropDownPicker
            style={{
              backgroundColor: "green"
            }}
            disabledStyle={{
              opacity: 0.5
            }}
            textStyle={{
              fontSize: 15
            }}
            labelStyle={{
              fontWeight: "bold"
            }}
            containerStyle={{
              width: '40%',
            }}
            open={fontVerticalOpen}
            value={fontVerticalValue}
            items={fontVertical}
            setOpen={fontVerticalSetOpen}
            setValue={setFontVerticalValue}
            setItems={setFontVertical}
          />
        </View>

        {/* <View style={{ marginTop: 120 }}>

        <TouchableOpacity
          //style={styles.button}
          onPress={handleChangeColor}
        >
          <Text>Press Here</Text>
        </TouchableOpacity> 
      </View>
          */}
        <View>
          <Text>Background Color</Text>

          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 12, margin: 0 }}>
            {renderColor(setColor)}
          </View>

        </View>


        {/* <Button style={styles.create}>

        </Button> */}
        {/* 
<CirclePicker 
  color="red"
  onChangeComplete={handleChangeColor}
/> */}
        {/* 
      <Button style={styles.create}>

      </Button> */}
        <TouchableOpacity style={styles.create} onPress={handleCreateTwok}>
          <Text style={{ color: 'white', fontWeight: '600' }}>Create!</Text>
        </TouchableOpacity>

      </ScrollView>

    </KeyboardAvoidingView>


  );
};

const styles = StyleSheet.create({
  container: {
    //display: flex,
    //justifyContent: 'center',
    flex: 1,
    margin: 20,
    marginTop: 100
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: 'black',
    alignSelf: 'center',
    marginBottom: 16
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 6,
    //height: 50,
    marginTop: 8,
    paddingHorizontal: 16,
    fontSize: 18,
    alignItems: 'center',
    marginBottom: 10,
  },
  create: {
    marginTop: 24,
    height: 50,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: '#00942a'
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
  colorSelect: {
    width: 30,
    height: 30,
    borderRadius: 4
  },
  anteprima: {
    width: 600,
    height: 400,
    border: 5,
    borderColor: 'black',
    borderRadius: 5,
    padding: 5,
    margin: 10,
  },
  ComboBoxRow: {
    justifyContent: "space-between",
    flexDirection: "row",
    //alignItems: 'center',
    //alignContent: 'space-around',
    height: 200,
    //width: 'auto',
    //padding: 15,
    //flexWrap: "wrap"
    //flex: 1,
    padding: 20,
    //marginBottom: 50,
    //height: '30%',
  },
  twokStyle: {
    width: "100%",
    height: Dimensions.get('window').height,
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    //fontSize: 40,
    fontWeight: "700"
  },
  twokStyle: {
    width: '100%',
    height: 400,
  }
});
export default CreaTwok;