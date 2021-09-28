import React, {useEffect, useState} from 'react';
import {Text, View, Dimensions} from "react-native";
import CardImage from "../atoms/CardImage";
import {t} from "react-native-tailwindcss";
import TextTitle from "../atoms/TextTitle";
import StarRating from 'react-native-star-rating-widget';
import {ScrollView} from "react-native-gesture-handler";
import * as SecureStore from 'expo-secure-store';
import {isFuture, formatISO} from 'date-fns';
import {selectmoviesCache, setMovieCache} from "../../feature/movies/moviesSlice";
import {useDispatch, useSelector} from "react-redux";
import {Snackbar} from 'react-native-paper';
import {API_KEY} from "../../utils";

const FormDetail = ({movie, style}: any) => {

    const [rating, setRating] = useState(0.5);
    const [visible, setVisible] = React.useState(false);
    const onToggleSnackBar = () => setVisible(!visible);
    const onDismissSnackBar = () => setVisible(false);

    const dispatch = useDispatch();
    const moviesCache = useSelector(selectmoviesCache);

    useEffect(() => {
        if (moviesCache[movie.id]) {
            setRating(moviesCache[movie.id]/2);
        }
    }, []);

    const getDataUser = async (): Promise<any> => {
        const response = await fetch(`https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${API_KEY}`);
        return await response.json();
    }

    const giveRateMovie = async (idMovie: string, guestSession: string, rate: number): Promise<void> => {
        console.log(idMovie, guestSession)
        const formData = new FormData();
        formData.append('value', (rate * 2).toString());
        const response = await fetch(`https://api.themoviedb.org/3/movie/${idMovie}/rating?api_key=${API_KEY}&guest_session_id=${guestSession}`, {
            method: 'POST', // or 'PUT'
            body: formData,
        })
        const success = (await response.json()).success;
        if (success) {
            dispatch(setMovieCache({id: idMovie, rate: rate * 2}));
            console.log("ok");
            onToggleSnackBar();
        }
    }

    const getGuestSessionId = async (session: string) => {
        let user = JSON.parse(session);
        const date = user.expires_at.replace(/\s/, "T").replace(/\sUTC/, "");
        if (!isFuture(new Date(date))) {
            let dataUser = await getDataUser();
            user = await getDataUser();
            await SecureStore.setItemAsync("guest_session", JSON.stringify(dataUser));
        }
        return user.guest_session_id;
    }

    const rateMovie = async (e: number): Promise<void> => {
        //await SecureStore.deleteItemAsync("guest_session");
        if (e <= 10) {
            setRating(e);
        }
        let session = await SecureStore.getItemAsync('guest_session');
        if (session) {
            const guestSessionId = await getGuestSessionId(session);
            console.log(guestSessionId);
            await giveRateMovie(movie.id, guestSessionId, e);

        } else {
            let dataUser = await getDataUser();
            await SecureStore.setItemAsync("guest_session", JSON.stringify(dataUser));
            session = await SecureStore.getItemAsync('guest_session');
            if (typeof session === "string") {
                const guestSessionId = await getGuestSessionId(session);
                console.log(guestSessionId);
                await giveRateMovie(movie.id, guestSessionId, e);
            }
        }
    }

    return (
        <View style={style}>
            <Snackbar
                style={{backgroundColor: 'white'}}
                visible={visible}
                onDismiss={onDismissSnackBar}
                action={{
                    label: 'Undo',
                    onPress: () => {
                        // Do something
                    },
                }}>
                <Text style={{color: 'black'}}>Your rating has been saved</Text>
            </Snackbar>
            <View style={[t.bgGray900, {flex: 1, alignItems: 'center'}]}>
                <CardImage url={movie.poster_path} style={{width: '60%', height: '95%'}}/>
            </View>
            {/*<CardImage url={movie.poster_path} style={[t.bgGray900, {flex: 1, alignItems: 'center'}]}/>*/}
            <ScrollView style={[t.bgGray800, {flex: 1, borderWidth: 0}]} contentContainerStyle={[t.itemsCenter, t.pX4]}>
                <View style={[t.mY3]}>
                    <TextTitle text={movie.original_title + " (" + movie.vote_average +")"} textColor={'white'} size={22}/>
                </View>
                <TextTitle text={movie.overview} fontFamily={'Nunito-Regular'} textColor={'white'} size={18}/>
                <View style={[t.mT4]}>
                    <TextTitle text={'Give a rate !'} textColor={'white'} size={18}/>
                </View>
                <View style={[t.mY2, t.itemsCenter, {flex: 1}]}>
                    <StarRating
                        starSize={Dimensions.get('screen').width / 10}
                        maxStars={5}
                        minRating={0.5}
                        rating={rating}
                        enableSwiping={false}
                        onChange={rateMovie}
                    />
                    <TextTitle text={"rate: " + (rating * 2)
                        .toString()} textColor={'white'} size={15}/>
                </View>

            </ScrollView>
        </View>
    )
}
export default FormDetail;
