import { View, Text } from 'react-native'
import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import BachecaUtente from './BachecaUtente';
import UtentiSeguiti from './UtentiSeguiti';
import Bacheca from './Bacheca';
import CreaTwok from './CreaTwok';
import { MaterialCommunityIcons } from '@expo/vector-icons';



const Tab = createMaterialBottomTabNavigator();
const MyTabs = () => {
    return (
        <Tab.Navigator
            initialRouteName="Bacheca"
            //activeColor="#e91e63"
            labelStyle={{ fontSize: 12 }}
            //style={{ backgroundColor: 'tomato' }}
            screenOptions={{
                //tabBarActiveTintColor: '#e91e63',
                tabBarActiveTintColor: '#000000',
            }}
        >
            <Tab.Screen
                name="Bacheca"
                component={Bacheca}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" color={color} size={26} />
                    ),
                }}
            />
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
                component={BachecaUtente}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="account-circle" color={color} size={26} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default MyTabs