import { View, Text, FlatList, Dimensions, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Twok from './Twok';
import { SingleTwokLoaderHelper } from './TwokLoaderHelper';
import { SingleTwokHandler } from './TwokLoaderHelper';
import { oneTwok } from './TwokLoaderHelper';

const ListaTwok = ({ sid, tid, uid, map, setMap, navigation }) => {
    const [getData, setData] = useState([]);
    const [mapAut, SetmapAut] = useState(new Map());
    
    //UseEffect funzionante ma da risolvere il fatto che 
    useEffect(() => {

        SingleTwokHandler(sid, tid, uid, map)
            .then(result => {
                setData(result)
                console.log(result)
                return
            })
    }, []);//array delle dipendenze

    const renderItem = ({ item }) => (
        //console.log(item)
        <Twok
            item={item}
            navigation={navigation}
            auts={mapAut}
            onLoadPicture={SetmapAut}
        />
    );

    const fun = () => (
        //risolvere il problema del tidSequenza per non dover ripartire da caspo ongi singola volta
        oneTwok(sid, tid, uid, map)
            .then(result => {
                console.log(result)
                console.log(map)
                setData(Array.from(map.values()))
                return
            })
    );

    return (
        <View>
            <FlatList
                //data={Array.from(mapData.values())}
                data={getData}
                renderItem={renderItem}
                keyExtractor={(item) => item.tid}
                snapToInterval={Dimensions.get('window').height}
                snapToAlignment="start"
                decelerationRate="fast"
                onEndReachedThreshold={0.5}
                onEndReached={() => {
                    // console.log("chiamo un nuovo Twok");
                    fun();
                }}
                //onScrollEndDrag={fun}
            />
        </View>
    )
}

export default ListaTwok