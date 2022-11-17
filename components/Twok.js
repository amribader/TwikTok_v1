import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';


const Twok = ({ item }) => {
  
  return (
    <View style={styles.twokStyle}>
        <Text style={styles.textStyle}>{item.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  twokStyle: {
    width: "100%",
    height: Dimensions.get('window').height,
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 40,
    fontWeight: "700"
  }
});

export default Twok;