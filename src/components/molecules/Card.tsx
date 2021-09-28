import * as React from 'react';
import {Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';
import {t} from "react-native-tailwindcss";
import {View, Text, Image} from "react-native";
import TextTitle from "../atoms/TextTitle";
import {RectButton} from "react-native-gesture-handler";
import RippleButton from "../atoms/RippleButton";
import CardImage from "../atoms/CardImage";

const LeftContent = (props: { size: number }) => <Avatar.Icon {...props} icon="folder"/>

const CardMovie = ({
                       url,
                       title,
                       release_date,
                       style,
                       vote_average,
                       onPress
                   }: { url: string, release_date: string, title: string, style: any, vote_average: string, onPress?: () => void }) => (
    <View style={style}>
        <RippleButton onPress={onPress} rippleColor='#FFFFFF' style={[t.shadowLg, t.bgGray800, t.flex1, t.roundedLg]}>
            {/*<Image
                style={[t.wFull, t.h48, t.overflowHidden, t.roundedTLg, {zIndex: 0, overflow: 'hidden', opacity: 0.9}]}
                source={{
                    uri: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2' + url,
                }}
            />*/}
            <CardImage onPress={onPress} url={url} style={[t.wFull, t.h48, t.overflowHidden, t.roundedTLg, {
                zIndex: 0,
                overflow: 'hidden',
                opacity: 0.9
            }]}/>

            <View style={[t.hAuto, t.flex1, t.justifyCenter, t.itemsCenter, t.pX2]}>
                <TextTitle text={title + " (" + vote_average + ")"} wrap={true} textColor={'white'}/>
                <TextTitle fontFamily={"Nunito-Regular"} wrap={true} text={release_date} textColor={'white'}/>

            </View>
        </RippleButton>
    </View>
);

export default CardMovie;
