import React, {useEffect} from 'react';
import {View, Text} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {getPopularMovies, selectAllNowPlaying,getNowPlayingMovies} from "./moviesSlice";
import {t} from "react-native-tailwindcss";
import ListMovies from "../../components/organisms/ListMovies";
import {NativeStackScreenProps} from "react-native-screens/native-stack";
import {RootStackParamList} from "../../app/navigation/RootStack";

type Props = NativeStackScreenProps<RootStackParamList, 'Movies'>;

const NowPlayingPage = ({navigation}: Props): JSX.Element => {

    const dispatch = useDispatch();
    const movies = useSelector(selectAllNowPlaying);
    useEffect(() => {
        dispatch(getNowPlayingMovies(1));
    }, []);
    return (
        <View style={[t.bgGray700,t.flex1]}>
            <ListMovies navigation={navigation} func={getNowPlayingMovies} movies={movies} style={[t.flexRow, t.flexWrap]}/>
        </View>
    );
};

export default NowPlayingPage;
