import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import PopularPage from "../../feature/movies/PopularPage";
import NowPlayingPage from "../../feature/movies/NowPlayingPage";
import UpComingPage from "../../feature/movies/UpComingPage";
import {Text} from 'react-native';
import {StatusBar} from "expo-status-bar";

const Tab = createMaterialBottomTabNavigator();

const TodosTabNavigator = (): JSX.Element => {
    return (
        <Tab.Navigator initialRouteName={'Home'} shifting={true}

                       barStyle={{backgroundColor: '#111827'}}>
            <Tab.Screen name={'Home'} component={PopularPage} options={{
                tabBarLabel: "Popular",
                tabBarIcon: ({color}) => (
                    <MaterialCommunityIcons name="poll" color={color} size={25}/>
                ),
            }}/>
            <Tab.Screen name={'now'} component={NowPlayingPage} options={{
                tabBarLabel: "Now Playing",
                tabBarIcon: ({color}) => (
                    <MaterialCommunityIcons name="signal-variant" color={color} size={25}/>
                ),
            }}/>
            <Tab.Screen name={'upcoming'} component={UpComingPage} options={{
                tabBarLabel: "Upcoming",
                tabBarIcon: ({color}) => (
                    <MaterialCommunityIcons name="cryengine" color={color} size={25}/>
                ),
            }}/>
        </Tab.Navigator>
    );
};

export default TodosTabNavigator;
