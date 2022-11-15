import { useEffect, useState } from "react";
import { SafeAreaView, Text, StyleSheet, View, Image } from "react-native";
import { StatusBar } from "expo-status-bar";

const Twok = ({ tid, sid, auts, onLoadPicture }) => {
  const [result, SetResult] = useState();
  const [loader, Setloader] = useState(true);
  const url = "https://develop.ewlab.di.unimi.it/mc/twittok/getTwok";
  const url_picture = "https://develop.ewlab.di.unimi.it/mc/twittok/getPicture";

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    //mode: 'no-cors',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sid: sid,
      tid: tid,
    }),
  };

  const callTwok = async () => {
    const data = await fetch(url, requestOptions);
    const result = await data.json();
    const second = await fetch(url_picture, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      //mode: 'no-cors',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sid: sid,
        uid: result.uid,
      }),
    });
    const item = await second.json();
    console.log(item);
    console.log(sid);
    auts.has(result.uid)
      ? null
      : onLoadPicture(auts.set(result.uid, item.picture));
    SetResult(result);
    //console.log(auts);
    //console.log(result);
  };

  useEffect(() => {
    // console.log("PRENDIAMO I TWOK");
    callTwok().then(() => {
      // console.log("Ora mostriamo i Twok");
      Setloader(false);
    });
  }, []);

  {
    /* <Image
    source={{ uri: "data: image/png:base64," + auts.get(result.uid) }}
    style={{ width: 200, height: 200 }}
  /> */
  }
  return (
    <SafeAreaView style={styles.container}>
      {loader ? (
        <Text>LOADING...</Text>
      ) : (
        <View style={styles.item}>
          <Text>{result.text}</Text>
          <Text>{sid}</Text>

          <Text>by: {result.uid}</Text>
          <Image
            source={{ uri: "data:image/png;base64," + auts.get(result.uid) }}
            style={{ width: 200, height: 200 }}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default Twok;