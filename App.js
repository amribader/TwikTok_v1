import { register } from './components/CommunicationController';
import { NavigationContainer } from '@react-navigation/native';
import MyTabs from './routes/screens/MyTabs';
import { createContext } from 'react';
import { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UtentiSeguiti from './routes/screens/UtentiSeguiti';

const SidContext = createContext();

export default function App() {

  const [sid, setSid] = useState();
  const Stack = createNativeStackNavigator();
  useEffect(() => {
    register()
      .then((response) => setSid(response.sid))
  }, []);


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
        
        <Stack.Screen name="UtentiSeguiti" component={UtentiSeguiti}/>
      </Stack.Navigator>
      </NavigationContainer>
    </SidContext.Provider>

  );
}




export { SidContext };
