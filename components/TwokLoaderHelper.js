import { View, Text } from 'react-native'
import React from 'react'
import { getTwok } from './CommunicationController';

 const TwokLoaderHelper = async (sid,tidSequence) => {
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

   


const SingleTwokLoaderHelper = async (sid,tidSequence) => {
    let flag = true;
    //console.log({sid,tidSequence})
    //var tidSequence = 1;
    let obj = []
    while (flag) {
        console.log("ciao")
        const newTwok = await getTwok(sid, tidSequence)
        console.log(newTwok)
        //newTwok ? twoks.push(newTwok) : console.log(tidSequence,"vuoto")
        //Object.keys(newTwok).length === 0 ? tidSequence++ : twoks.push(newTwok)
        if(Object.keys(newTwok).length === 0){
            tidSequence++
        }else{
            obj = newTwok
            flag = false
        }
        //console.log(newTwok)

        //tidSequence++;
    }

    //console.log(twoks)
    return obj;
}


export {SingleTwokLoaderHelper, TwokLoaderHelper};