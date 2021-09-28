import React, {useEffect} from 'react';
import {SafeAreaView, View, Text, ActivityIndicator} from 'react-native';
import {NativeStackScreenProps} from "react-native-screens/native-stack";
import {RootStackParamList} from "../../app/navigation/RootStack";
import {selectAllPopular} from "./moviesSlice";
import {useDispatch, useSelector} from "react-redux";
import ListMovies from "../../components/organisms/ListMovies";

import {getPopularMovies, selectLoading} from "./moviesSlice";
import {t} from "react-native-tailwindcss";

type Props = NativeStackScreenProps<RootStackParamList, 'Movies'>;

const PopularPage = ({navigation}: Props): JSX.Element => {

    const dispatch = useDispatch();
    const movies = useSelector(selectAllPopular);
    const loading = useSelector(selectLoading);

    useEffect(() => {
        dispatch(getPopularMovies(1));
    }, []);
    return (
        <View style={[t.bgGray700, t.flex1,t.itemsCenter,t.justifyCenter]}>
            {<ListMovies navigation={navigation} func={getPopularMovies} movies={movies} style={[t.flexRow, t.flexWrap]}/>}
        </View>
    );
};

export default PopularPage;
