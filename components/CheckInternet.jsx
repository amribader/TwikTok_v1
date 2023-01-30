import {useEffect, useState} from "react";
import NetInfo from "@react-native-community/netinfo";
import {Text, View} from "react-native";

const CheckInternet = ({isConnected,setIsConnected}) => {
    //pop-up
    //const [showMessage, setShowMessage] = useState(true);

  useEffect(()=>{
      const unsubscribe = NetInfo.addEventListener(state => {
          console.log('Connection type', state.type);
          console.log('Is connected?', state.isConnected);
          setIsConnected(state.isConnected)
          //setIsConnected(true)
      });

// To unsubscribe to these update, just use:
      return () =>{
          unsubscribe();
      }
  },[]);

  useEffect(()=>{
      if (isConnected){
          alert("No connection")
      }
  },[])
  const checkConnection = () => {
    console.log("connection error");
    NetInfo.fetch().then(state =>{
        console.log('Connection type', state.type);
        console.log('Is connected?', state.isConnected);
    })
  }

    // setTimeout(() => {
    //     setShowMessage(false);
    // }, 3000); // il messaggio scompare dopo 3 secondi

  return (

      <View style={{flex:1}}>
          {/*{*/}
          {/*    showMessage && (*/}
        <View style={{
            position: 'absolute',
            bottom: 0,
            height: 10,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: isConnected ? 'green' : 'black'
        }}>
            <Text style={{color: '#fff'}}>
                {isConnected ? 'Back online' : 'no Internet Connection' }
            </Text>
        </View>


          {/*<View>*/}
          {/*    {showMessage && (*/}
          {/*        <Text>Questo è un messaggio flash</Text>*/}
          {/*    )}*/}
          {/*</View>*/}

      </View>

  )
}

export default CheckInternet;