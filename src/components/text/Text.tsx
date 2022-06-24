import { View, Text, ViewStyle } from 'react-native'
import React from 'react'
import { grey } from '@ant-design/colors';

interface Props {
    style?: ViewStyle;
    size?: number;
    color?: string;
    fw?: "thin" | "regular" | "medium" | "light" | "bold" | "black";
    align?: "center" | "left" | "right";
    decoration?: "none" | "underline",
    children: any;
}

export default function TextComp({size=1, fw="medium", children="", align="left", style={}, color=grey[9], decoration="none"}: Props) {
  return (
    <View style={style}>
        <Text 
            style={{
                color: color,
                textAlign: align,
                fontSize: 14 * size,
                fontFamily: fw === "thin" ? "NotoSansKR-Thin" :
                fw === "regular" ? "NotoSansKR-Regular" :
                fw === "medium" ? "NotoSansKR-Medium" :
                fw === "light" ? "NotoSansKR-Light" :
                fw === "bold" ? "NotoSansKR-Bold" : 
                fw === "black" ? "NotoSansKR-Black" : 
                "NotoSansKR-Medium",
                lineHeight: 14 * size * 1.4,
                alignItems: 'center',
                justifyContent: 'center',
                textAlignVertical: 'center',
                margin: 0, padding: 0,
                textDecorationLine: decoration,
            }}
        >{children}
        </Text>
    </View>
  )
}