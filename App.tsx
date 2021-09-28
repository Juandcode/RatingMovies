import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import AppNavigator from "./src/app/navigation/stack-navigator";
import store from './src/app/store';
import {Provider} from "react-redux";

export default function App(): JSX.Element {
    return (
        <Provider store={store}>
            <StatusBar style="light"/>
            <AppNavigator/>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
