import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { getTwok } from './CommunicationController';

const TwokLoaderHelper = async (sid, tidSequence) => {
    //console.log({sid,tidSequence})
    //var tidSequence = 1;
    const twoks = []
    while (tidSequence < 15) {
        //console.log("ciao")
        const newTwok = await getTwok(sid, tidSequence)
        //newTwok ? twoks.push(newTwok) : console.log(tidSequence,"vuoto")
        Object.keys(newTwok).length === 0 ? 'console.log(tidSequence,"vuoto")' : twoks.push(newTwok)
        //console.log(newTwok)

        tidSequence++;
    }

    //console.log(twoks)
    return twoks;
}




const SingleTwokLoaderHelper = async (sid, tidSequence) => {
    let flag = true;
    //console.log({sid,tidSequence})
    //var tidSequence = 1;
    let obj = []
    const twoks = []
    while (flag) {
        //console.log("ciao")
        const newTwok = await getTwok(sid, tidSequence)
        //console.log(newTwok)
        //newTwok ? twoks.push(newTwok) : console.log(tidSequence,"vuoto")
        //Object.keys(newTwok).length === 0 ? tidSequence++ : twoks.push(newTwok)
        if (Object.keys(newTwok).length === 0) {
            //tidSequence++
        } else {
            //obj = newTwok
            //flag = false
            twoks.push(newTwok)
        }
        //console.log(newTwok)

        tidSequence++;

        if (twoks.length == 10) {
            flag = false;
        }
    }

    //console.log(twoks)

    //let chars = ['A', 'B', 'A', 'C', 'B'];
    let uniqueChars = [...new Set(twoks)];

    //console.log(uniqueChars);
    return uniqueChars;
}

const TwokHandler = (sid, tidSequence) => {
    const [map, setMap] = useState(null);
    const array = [];
    SingleTwokLoaderHelper(sid, tidSequence)
        .then(result => {
            array = result;
        })

    array.forEach((elem) => {
        if (!map.has(elem.tid)) {
            map.set(elem.tid, elem)
        }
    })

    //data={Array.from(mapData.values())}

    return Array.from(map.values())

}
/////////////////////////////////////////////////////
const SingleTwokHandler = async (sid, tidSequence, map) => {

    //const [map, setMap] = useState(null);
    let array = [];
    await SingleTwokLoaderHelper(sid, tidSequence)
        .then(result => {
            array = result;
        })

    array.forEach((elem) => {
        if (!map.has(elem.tid)) {
            map.set(elem.tid, elem)
        }
    })

    //data={Array.from(mapData.values())}

    return Array.from(map.values())

}

const oneTwok = async (sid, tidSequence, map) => {
    let bool = true;
    let obj = {};
    while (bool) {
        const newTwok = await getTwok(sid, tidSequence)
        obj = newTwok;
        /* .then(result => {
            obj = result;
        }) */
        if (Object.keys(newTwok).length === 0) {
            console.log("ramo if")
            tidSequence++;

        } else {
            console.log("OBJ:", obj)
            if (checkInMap(obj, map)) {
                console.log("ramo if")
                tidSequence++;
            } else {
                console.log("ramo else")
                bool = false;
            }
        }

    }
    console.log("----->", obj)
    map.set(obj.tid, obj);
    console.log("MAPPA COMPLETA->", map)
    return

}

const checkInMap = (obj, map) => {
    console.log("MAP->", map)
    console.log("OGGETTO->", obj)
    console.log("boolean_>", map.has(obj.tid))
    return map.has(obj.tid)
}


export { SingleTwokLoaderHelper, TwokLoaderHelper, SingleTwokHandler, oneTwok };