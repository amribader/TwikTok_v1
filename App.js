import { register } from './components/CommunicationController';
import { NavigationContainer } from '@react-navigation/native';
import MyTabs from './routes/screens/MyTabs';
import { createContext } from 'react';
import { useState, useEffect } from 'react';

const SidContext = createContext();

export default function App() {

  const [sid, setSid] = useState();

  useEffect(() => {
    register()
      .then((response) => setSid(response.sid))
  }, []);


  return (
    <SidContext.Provider value={sid}>
      <NavigationContainer>
        <MyTabs />
      </NavigationContainer>
    </SidContext.Provider>

  );
}




export { SidContext };
