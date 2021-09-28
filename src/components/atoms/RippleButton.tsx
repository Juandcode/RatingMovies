import React from 'react';
import {RectButton} from "react-native-gesture-handler";

const RippleButton = ({style,children,onPress}: any) => {
    return(
        <RectButton onPress={onPress} rippleColor='#FFFFFF' style={style} >
            {children}
        </RectButton>
    )
}

export default RippleButton;
