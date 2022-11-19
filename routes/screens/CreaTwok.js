import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { TextInput } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';


const CreaTwok = () => {
  const [text, setText] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' }
  ]);


  const backgroundColors = ['#000000', '#888888', '#ed1c24', '#d11cd5', '#1633e6', '#00aeef', '#00c85d', '#57ff0a', '#ffde17', '#f26522'];
  const [color, setColor] = useState(backgroundColors[0]);
  const renderColor = () => {
    return backgroundColors.map(color => {
      return (
        <TouchableOpacity
          key={color}
          style={[styles.colorSelect, { backgroundColor: color }]}
          onPress={() => {
            console.log(color)             
            setColor({ color })
            return
          }}
        />
      )
    })
  }

  const handleChangeColor = (color) => console.log(color);
  return (
    //<KeyboardAvoidingView style={styles.container} behavior="padding">
      <SafeAreaView style={styles.container} behavior="padding">

        <TextInput
          style={styles.input}
          label="Inserisci Testo Twok"
          value={text}
          onChangeText={text => setText(text)}
        />
        {text ? (
          <View style={{backgroundColors:{color}}}>
            <Text>{text}</Text>
          </View>

        ) : (
          <></>
        )}

        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleChangeColor}
        >
          <Text>Press Here</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 12 }}>
          {renderColor()}
        </View>

        {/* 
<CirclePicker 
  color="red"
  onChangeComplete={handleChangeColor}
/> */}
      </SafeAreaView>
   // </KeyboardAvoidingView>


  );
};
const styles = StyleSheet.create({
  container:{
    flex: 1
  },
  title:{
    fontSize:28,
    fontWeight: '800',
    color: 'black',
    alignSelf: 'center',
    marginBottom: 16
  },
  input:{
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'blue',
    borderRadius:6,
    height:50,
    marginTop:8,
    paddingHorizontal: 16,
    fontSize: 18
  },
  create: {
    marginTop:24,
    height:50,
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
  }
});
export default CreaTwok;