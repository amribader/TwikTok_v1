import { View, Text } from 'react-native'
import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import BachecaUtente from './BachecaUtente';
import UtentiSeguiti from './UtentiSeguiti';
import Bacheca from './Bacheca';
import CreaTwok from './CreaTwok';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import TwokOnMap from './TwokOnMap'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profilo from './Profilo';

const SettingsStack = createNativeStackNavigator();
const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const MyTabs = () => {
    return (
        //<NavigationContainer independent={true}>
        <Tab.Navigator
            
            initialRouteName="Bacheca"
            //activeColor="#e91e63"
            labelStyle={{ fontSize: 12 }}
            //style={{ backgroundColor: 'tomato' }}
            screenOptions={{
                headerShown: false
            }}
        >
            <Tab.Screen
                name="Bacheca" options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" color={color} size={26} />
                    ),
                    headerShown: false
                }}
                >{/* 
                component={Bacheca}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" color={color} size={26} />
                    ),
                }} */}

                {() => (
                    <SettingsStack.Navigator  screenOptions={{
                        headerShown: false}}>
                        <SettingsStack.Screen name="Home" component={Bacheca} screenOptions={{
                headerShown: false}} />
                        <SettingsStack.Screen name="BachecaUtente" component={BachecaUtente} />
                        <SettingsStack.Screen name="TwokOnMap" component={TwokOnMap} />
                    </SettingsStack.Navigator>
                )}
            </Tab.Screen>
            <Tab.Screen
                name="CreaTwok"
                component={CreaTwok}
                options={{
                    tabBarLabel: 'Crea Twok',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="plus-box" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profilo}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="account-circle" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Follower"
                component={UtentiSeguiti}
                options={{
                    tabBarLabel: 'Follower',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="account-group" color={color} size={26} />
                    ),
                }}
            />
        </Tab.Navigator>
        //<Stack.Screen name="UtentiSeguiti" component={UtentiSeguiti} />
        //</NavigationContainer>
    );
}

export default MyTabs