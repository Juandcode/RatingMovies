import React, {useState} from 'react';
import {RefreshControl, Text, View, FlatList} from 'react-native';
import CardMovie from "../molecules/Card";
import {t} from "react-native-tailwindcss";
import {useDispatch, useSelector} from "react-redux";
import {selectAllPopular, selectLoading} from "../../feature/movies/moviesSlice";
import {ScrollView} from "react-native-gesture-handler";
import {AsyncThunk} from "@reduxjs/toolkit";
import {NativeStackNavigationProp, NativeStackScreenProps} from "react-native-screens/native-stack";
import {RootStackParamList} from "../../app/navigation/RootStack";

type movie = {
    id: number,
    poster_path: string,
    title: string,
    release_date: string,
    vote_average: string,
    backdrop_path:string,
    original_title: string,
    overview: string,

}
type Props = NativeStackScreenProps<RootStackParamList, 'Movies'>;
const ListMovies = ({
                        style,
                        movies,
                        func,
                        navigation,
                    }: {
    style: any, movies: any[], func: AsyncThunk<{ movies: movie[], page: number }, number, {}>,
    navigation: NativeStackNavigationProp<RootStackParamList, "Movies">
}): JSX.Element => {

    const dispatch = useDispatch();
    // const loading = useSelector(selectLoading);
    //const movies = useSelector(selectAllPopular);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(2);

    const showDetail = (movie: movie) => (): void => {
        console.log("Detail");
        navigation.navigate("Detail", {movie: movie});
    }

    return (
        <ScrollView
            onMomentumScrollEnd={(e) => {
                const scrollPosition = e.nativeEvent.contentOffset.y;
                const scrollViewHeight = e.nativeEvent.layoutMeasurement.height;
                const contentSize = e.nativeEvent.contentSize.height;
                const totalScroll = scrollViewHeight + scrollPosition;
                if (totalScroll >= contentSize - 50) {
                    //console.log("llego al final");
                    dispatch(func(page));
                    console.log(page);
                    setPage(page + 1);
                }
                // console.log(e.nativeEvent);
            }}
            refreshControl={
                <RefreshControl
                    refreshing={loading}
                    onRefresh={() => {
                        setLoading(true);
                        dispatch(func(1));
                        setLoading(false);
                    }}
                />
            } contentContainerStyle={style}>
            {movies.map((e, key) => <CardMovie style={[t.w2_4, t.h64, t.p2]} onPress={showDetail(e)} key={key} release_date={e.release_date}
                                               title={e.title} vote_average={e.vote_average} url={e.poster_path}/>)}

        </ScrollView>
    );
}

export default ListMovies;
