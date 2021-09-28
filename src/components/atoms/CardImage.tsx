import React from "react";
import {Image, View, Text} from "react-native";
import {t} from "react-native-tailwindcss";
import RippleButton from "../atoms/RippleButton";


const CardImage = ({url, style, onPress}: { url: string, style: any, onPress?: () => void }): JSX.Element => {
    return (
        <RippleButton rippleColor='#FFFFFF' onPress={onPress} style={style}>
            <Image style={{flex: 1, opacity: 0.9}}
                   source={{
                       uri: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2' + url,
                   }}
            />
        </RippleButton>
    )
}
export default CardImage;
