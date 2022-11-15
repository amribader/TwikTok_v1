import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { register } from './components/CommunicationController';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BachecaUtente from './routes/screens/BachecaUtente';
import UtentiSeguiti from './routes/screens/UtentiSeguiti';
import Bacheca from './routes/screens/Bacheca';
import { createContext } from 'react';
import {useState, useEffect} from 'react';

const Stack = createNativeStackNavigator();

const SidContext = createContext();

export default function App() {

  const [sid, setSid] = useState();

  useEffect(() => {
    register()
    .then((response)=> setSid(response.sid))
    /* .then((response)=> {
      console.log(response.sid)
      return setSid(response.sid)})

    console.log(sid) */
  }, []);

  
  return (
    <SidContext.Provider value={{sid, setSid}}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Bacheca">
          <Stack.Screen name="Bacheca" component={Bacheca} />
          <Stack.Screen name="BachecaUtente" component={BachecaUtente} />
          <Stack.Screen name="UtentiSeguiti" component={UtentiSeguiti} />
        </Stack.Navigator>
      </NavigationContainer>
    </SidContext.Provider>

  );
}

export {SidContext};
