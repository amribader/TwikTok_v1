import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, StyleSheet, Slider, Dimensions, KeyboardAvoidingView, Button } from 'react-native';
import { TextInput } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';


const CreaTwok = () => {

  let [fontsLoaded] = useFonts({
    'Anton-Regular' : require('../../assets/font/Anton-Regular.ttf'),
    'BhuTukaExpandedOne' : require('../../assets/font/BhuTukaExpandedOne-Regular.ttf'),
    'DancingScript' : require('../../assets/font/DancingScript-VariableFont_wght.ttf'),
  })



  const [text, setText] = useState('');
  const [fontDimOpen, setFontDimOpen] = useState(false);

  //const [fontSize, setFontSize] = useState(10);

  const [open, setOpen] = useState(false);
  
  
  const [fontDimValue, setFontDimValue] = useState(10);

  const [fontTypeValue, setFontTypeValue] = useState(null);

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
  const [fontHorizontal, setFontHorizontal] = useState([
    { label: 'Sinistra', value: 'left' },
    { label: 'Centro', value: 'center' },
    { label: 'Destra', value: 'right' }
  ]);

////////////////////////////////////////////////////////////////////////////////////////////////R
  const [fontVertical, setFontVertical] = useState([
    { label: 'Alto', value: 0 },
    { label: 'Basso', value: 1 },
    { label: 'Centro', value: 2 }
  ]);

  const backgroundColors = ['#000000', '#888888', '#ed1c24', '#d11cd5', '#1633e6', '#00aeef', '#00c85d', '#57ff0a', '#ffde17', '#f26522'];
  const [color, setColor] = useState(backgroundColors[0]);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  const renderColor = () => {
    return backgroundColors.map(color => {
      return (
        <TouchableOpacity
          key={color}
          style={[styles.colorSelect, { backgroundColor: color }]}
          onPress={() => {
            console.log(color)
            setColor(color)
            return
          }}
        />
      )
    })
  }



  const handleChangeColor = (color) => console.log(color);
  return (
    //<KeyboardAvoidingView style={styles.container} behavior="padding">
    //<ScrollView>

      <KeyboardAvoidingView style={styles.container} onLayout={onLayoutRootView} behavior="padding">
        <Text style={{fontFamily : 'Anton-Regular' , fontSize:40}}>CIAOOOOOO</Text>
        <TextInput
          //style={styles.input}
          label="Inserisci Testo Twok"
          value={text}
          onChangeText={text => setText(text)}
        />
        {text ? (
          <View style={[styles.twokStyle, { backgroundColor: color }]}>
            <Text style={[styles.textStyle,{fontSize: fontDimValue, fontFamily: fontTypeValue, fontStyle: fontTypeValue }]}>{text}</Text>
          </View>

        ) : (
          <></>
        )}

        <View style={[styles.ComboBoxRow,{}]}>

          <View>
            {/* FONT DIMENSIONI */}
            <DropDownPicker
              open={fontDimOpen}
              value={fontDimValue}
              items={fontDim}
              setOpen={setFontDimOpen}
              setValue={setFontDimValue}
              setItems={setFontDim}
            />
          </View>


          <View>
            {/* FONT TYPE */}
            <DropDownPicker
              open={open}
              value={fontTypeValue}
              items={fontType}
              setOpen={setOpen}
              setValue={setFontTypeValue}
              setItems={setFontType}
            />
          </View>


        </View>


        <View style={{marginTop:120}}>
        
        <TouchableOpacity
          style={styles.button}
          onPress={handleChangeColor}
        >
          <Text>Press Here</Text>
        </TouchableOpacity>
        </View>
          
        

        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 12 }}>
          {renderColor()}
        </View>

        {/* <Button style={styles.create}>

        </Button> */}
        {/* 
<CirclePicker 
  color="red"
  onChangeComplete={handleChangeColor}
/> */}
      </KeyboardAvoidingView>

   // </ScrollView>
    // </KeyboardAvoidingView>


  );
};
const styles = StyleSheet.create({
  container: {
    //display: flex,
    justifyContent: 'space-around',
    //flex: 1,
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
    height: 50,
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
    justifyContent: 'center'
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
    justifyContent: 'space-around',
    flexDirection: "row",
    flex: 1,
    padding: 20,
    //marginBottom: 50,
    height:400,
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
  }
});
export default CreaTwok;