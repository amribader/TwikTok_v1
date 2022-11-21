import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';

const Twok = ({ item }) => {

  let [fontsLoaded] = useFonts({
    'Anton-Regular': require('../assets/font/Anton-Regular.ttf'),
    'BhuTukaExpandedOne': require('../assets/font/BhuTukaExpandedOne-Regular.ttf'),
    'DancingScript': require('../assets/font/DancingScript-VariableFont_wght.ttf'),
  })

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  console.log(item)
  const textAlignmentsVertical = ["flex-start", "center", "flex-end"];
  const textAlignments = ["left", "center", "right"];
  const fontWeights  = [18,30,44];
  const fontType = ['BhuTukaExpandedOne','DancingScript','Anton-Regular']
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
  }
});

export default Twok;