import { register } from './components/CommunicationController';
import { NavigationContainer } from '@react-navigation/native';
import MyTabs from './routes/screens/MyTabs';
import { createContext } from 'react';
import { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UtentiSeguiti from './routes/screens/UtentiSeguiti';
import AsyncStorage from '@react-native-async-storage/async-storage';
const SidContext = createContext();

export default function App() {

  const [sid, setSid] = useState();
  const Stack = createNativeStackNavigator();

  useEffect(() => {
    //clearAll();
    console.log(getData())
    getData()
    .then(response => {
      console.log(response)
      response ? setSid(response) : callFunction();
    })
    // ? setSid(getData()) : callFunction();
    console.log(sid);
  }, []);

  const callFunction = () => {
    console.log("call")
    register()
      .then((response) => {
        console.log(response)
        setSid(response.sid)
        storeData(response.sid)
      })
  }

  const storeData = async (value) => {
    console.log("storeData")
    try {
      await AsyncStorage.setItem('@storage_Key', value)
    } catch (e) {
      // saving error
      console.log("ERROR",e);
    }
  }


  const getData = async () => {
    console.log("getData")
    try {
      const value = await AsyncStorage.getItem('@storage_Key')
      if (value !== null) {
        // value previously stored
      }
      console.log(value)
      return value;
    } catch (e) {
      // error reading value
      console.log("ERROR",e);

    }

  }

  const clearAll = async () => {
    try {
      await AsyncStorage.clear()
    } catch(e) {
      // clear error
    }
  
    console.log('Done.')
  }


  return (
    <SidContext.Provider value={sid}>
      <NavigationContainer>
        {/* //<MyTabs /> */}
        <Stack.Navigator>
          <Stack.Screen
            name="MyTabs"
            component={MyTabs}
            options={{ headerShown: false }}
          />

          <Stack.Screen name="UtentiSeguiti" component={UtentiSeguiti} />
        </Stack.Navigator>
      </NavigationContainer>
    </SidContext.Provider>

  );
}




export { SidContext };
