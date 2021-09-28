import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, SafeAreaView} from 'react-native';
import {NativeStackScreenProps} from "react-native-screens/native-stack";
import {RootStackParamList} from "../app/navigation/RootStack";
import {CommonActions} from "@react-navigation/native";
import * as Font from 'expo-font';
import {useDispatch} from "react-redux";
import {getMoviesCache} from "./movies/moviesSlice";

type Props = NativeStackScreenProps<RootStackParamList, 'Loading'>;

interface IUser {
    name: string;
}

const LoadingPage = ({navigation}: Props): JSX.Element => {

    const dispatch = useDispatch();
    const loadFonts = async () => {
        await Font.loadAsync({
            "Nunito-Bold": require('../../assets/fonts/Nunito-Bold.ttf'),
            "Nunito-ExtraBold": require('../../assets/fonts/Nunito-ExtraBold.ttf'),
            "Nunito-ExtraLight": require('../../assets/fonts/Nunito-ExtraLight.ttf'),
            "Nunito-Light": require('../../assets/fonts/Nunito-Light.ttf'),
            "Nunito-Regular": require('../../assets/fonts/Nunito-Regular.ttf'),

        });
    }

    useEffect(() => {
        (async () => {
            await loadFonts();
            dispatch(getMoviesCache());
            navigation.navigate("Movies");
            navigation.dispatch(state => {
                const routes = state.routes.filter(r => r.name !== ('Loading'));
                return CommonActions.reset({
                    ...state,
                    routes,
                    index: routes.length - 1,
                });
            });
        })();

    }, []);
    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        }}><Text>Loading</Text></View>);
};
export default LoadingPage;
