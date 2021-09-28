import React from 'react';
import {CardStyleInterpolators, createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";
import LoadingPage from "../../feature/LoadingPage";
import {RootStackParamList} from "./RootStack";
import PopularPage from "../../feature/movies/PopularPage";
import TodosTabNavigator from "./tab-navigation";
import DetailPage from "../../feature/DetailPage";

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = (): JSX.Element => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={'Loading'}
                             screenOptions={{
                                 gestureDirection:'horizontal',
                                 cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                                 headerTintColor:'white',
                                 headerTitleStyle: { fontFamily: 'Nunito-Bold'},
                                 headerStyle: {
                                     backgroundColor: '#111827',
                                 },
                                 headerBackgroundContainerStyle: {}
                             }}>
                <Stack.Screen name={'Loading'} component={LoadingPage} options={{headerShown: false}}/>
                <Stack.Screen name={'Movies'} component={TodosTabNavigator}/>
                <Stack.Screen name={'Detail'} component={DetailPage}/>

            </Stack.Navigator>
        </NavigationContainer>
    );
};
export default AppNavigator;
