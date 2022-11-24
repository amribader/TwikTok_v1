import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView, KeyboardAvoidingView, TextInput, Button, Image } from 'react-native';
import { SidContext } from '../../App';
import { getProfile, setProfile } from '../../components/CommunicationController'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

const Profilo = () => {
    const [picture, setPicture] = useState()
    const [name, setName] = useState('')

    //const sid = useContext(SidContext);
    const sid = 'UixXnMdWnJHmMKGEyzHW'

    const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
    const [image, setImage] = useState(null);
    useEffect(() => {
        onLoad()
    }, []);

    useEffect(() => {
        (
            async () => {
                const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
                setHasGalleryPermission(galleryStatus.status === 'granted');
            })();
    }, []);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All, //.Images
            base64: true,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        //console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].base64);
            setPicture(result.assets[0].base64)
            //console.log(result.assets[0].uri)
            //chiamata server salva immagine
            //console.log(picture)
            //let str = result.assets[0].uri.substring(22)
            await changePicture(result.assets[0].base64)
            //console.log(result.assets[0].base64)
            //setImage(result.uri);
            //console.log(str)
            //setImage(str)
            //setPicture(str)
        }

    };

    if (hasGalleryPermission === false) {
        return <Text>NO ACCESS TO INTERNAL STORAGE</Text>
    }

    useFocusEffect(
        React.useCallback(() => {
            //alert('Screen was focused');
            onLoad()
            // Do something when the screen is focused
            return () => {
                //alert('Screen was unfocused');
                // Do something when the screen is unfocused
                // Useful for cleanup functions
            };
        }, [])
    );

    const onLoad = () => {
        getProfile(sid)
            .then(result => {
                //console.log(result);
                setName(result.name);
                setPicture(result.picture);
            })
    }

    const changeName = () => {
        //console.log(params)
        //console.log(sid)

        setProfile(sid, name)
            .then(result => {
                console.log(result)
            })
    }

    const changePicture = async (params) => {
        //console.log(params)
        /* 
                console.log(params)
                console.log(params.substring(23))
                let str = params.substring(23)
                console.log(sid) */
        console.log("PARAMS:",params)
        setProfile(sid, name, params)
            .then(result => {
                console.log(result)
            })
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.containerRow}>
                {
                    picture ? (
                        <View style={styles.containerImage}>

                            <Image
                                source={{ uri: "data:image/png;base64,"+ picture }} //"data:image/png;base64," 22caratteri
                                /* style={{ width: 200, height: 200 }} */
                                style={styles.image}
                            />
                            <Text>{name}</Text>
                        </View>
                    ) : (
                        <View style={styles.containerImage}>

                            <MaterialCommunityIcons name="account" color='black' size={38} />
                            <Text>{name}</Text>
                        </View>
                    )
                }
                <TextInput
                    style={styles.input}
                    onChangeText={setName}
                    value={name}
                />

                <Button
                    onPress={() => changeName(name)}
                    title="Cambia Nome"
                    color="#841584"
                    accessibilityLabel="Learn more about this purple button"
                />
                {/*
                <Button
                    onPress={() => change(name)}
                    title="Cambia Nome"
                    color="#841584"
                    accessibilityLabel="Learn more about this purple button"
                />
                */}


            </View>

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Button title="Pick an image from camera roll" onPress={pickImage} />
                {image && <Image source={{ uri: "data:image/png;base64,"+ image }} style={{ width: 200, height: 200 }} />}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 16,
    },
    image: {
        width: 100,
        height: 50,
        resizeMode: 'contain',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    containerRow: {
        flexDirection: 'row'
    },
    containerImage: {
        margin: 18,
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Profilo;
