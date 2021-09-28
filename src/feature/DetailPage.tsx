import React from 'react';
import {View, Text, Image} from 'react-native';
import {NativeStackScreenProps} from "react-native-screens/native-stack";
import {RootStackParamList} from "../app/navigation/RootStack";
import {t} from "react-native-tailwindcss";
import {RectButton} from "react-native-gesture-handler";
import RippleButton from "../components/atoms/RippleButton";
import FormDetail from "../components/organisms/FormDetail";

type movie = {
    id: number,
    poster_path: string,
    title: string,
    release_date: string,
    vote_average: string,

}
type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

const DetailPage = ({route, navigation}: Props) => {
    return (
        <FormDetail style={{flex: 1}} movie={route.params.movie}/>
    );
}

export default DetailPage;
