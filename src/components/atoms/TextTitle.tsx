import React from 'react';
import {Text} from 'react-native';

const TextTitle = ({
                       text,
                       size,
                       fontFamily,
                       textColor,
                       wrap,
                       style,
                   }: { text: string, size?: number, fontFamily?: string, textColor?: string, wrap?: boolean, style?: any }): JSX.Element => {
    return <Text numberOfLines={wrap ? 1 : undefined}
                 style={[{
                     fontFamily: fontFamily ? fontFamily : 'Nunito-Bold',
                     fontSize: size,
                     color: textColor ? textColor : 'black'
                 }, style]}>{text}</Text>
}
export default TextTitle;
