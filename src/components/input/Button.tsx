import React, { useMemo, useState} from 'react';
import {Pressable, View, ActivityIndicator, ViewStyle} from 'react-native';
import Text from '../text/Text';
import { lime, grey, red, yellow, orange, gold, volcano } from '@ant-design/colors';

// 인터페이스
interface Props {
    style?: ViewStyle;
    size?: number;
    title: string;
    type?: 'primary' | 'border' | 'text' | 'link',
    isLoading?: boolean;
    isDisable?: boolean;
    onPress: () => void;
    bg?: "lime" | "black" | "red" | "yellow" | "orange";
}

export default function Button({title, onPress, isDisable, size=1, isLoading=false, style, type="primary", bg="lime"}: Props) {

    const [isPress, setPress] = useState<boolean>(false)

    if (type === "primary") {

        let backgroundColor = useMemo(() => {
            let color = lime[3];
            if (bg === "black") color = grey[9];
            if (bg === "red") color = red[4];
            if (isDisable) color = grey[3]
            return color
        }, [isPress, isDisable, isLoading, bg]);

        let borderColor = useMemo(() => {
            let color = lime[3];
            if (bg === "lime") {
                if (isPress) color = lime[4];
            } else if (bg === "black") {
                color = grey[9];
                if (isPress) color = lime[3];
            } else if (bg === "red") {
                color = red[4];
                if (isPress) color = red[6];
            }
            if (isDisable) color = grey[3]
            return color
        }, [isPress, isDisable, isLoading, bg]);

        let fontColor = useMemo(() => {
            let color = grey[9];
            if (bg === "black") {
                color = lime[3];
            }
            if (bg === "red") {
                color = red[0];
            }
            if (isDisable) color = "white"
            return color
        }, [isPress, isDisable, isLoading, bg]);

        return (
            <Pressable 
                style={[{
                    width: '100%',
                    flexDirection: 'row',
                    alignContent: 'center',
                    justifyContent: 'center',
                    borderWidth: 1,
                    borderRadius: 4,
                    paddingVertical: 12 * size,
                    paddingHorizontal:12 * size,
                    backgroundColor: backgroundColor,
                    borderColor: borderColor,
                }, style]}
                onPressIn={() => {
                    if (!isDisable && !isLoading) {
                        setPress(true)
                    }
                }}
                onPressOut={() => {
                    if (!isDisable && !isLoading) {
                        setPress(false)
                    }
                }}
                onPress={() => {
                    if (!isDisable && !isLoading) {
                        onPress()
                    }
                }}
            >
                {
                    isLoading && 
                        <View style={{width: 20, height: 20}}>
                            <ActivityIndicator size={20}/>
                        </View>
                }
                <Text size={size} align="center" fw="bold" style={{flex: 1}} color={fontColor}>{title}</Text>
                {
                    isLoading && 
                        <View style={{width: 20, height: 20}}>
                        </View>
                }
            </Pressable>
        )
    } else if (type === "border") {

        let backgroundColor = useMemo(() => {
            let color = 'rgba(0,0,0,0)';
            return color
        }, [isPress, isDisable, isLoading, bg]);

        let borderColor = useMemo(() => {
            let color = lime[4];
            if (bg === "lime") {
                if (isPress) color = lime[5];
            } else if (bg === "black") {
                color = grey[9];
            } else if (bg === "red") {
                color = red[4];
                if (isPress) color = red[6];
            }
            if (isDisable) color = grey[5];
            return color
        }, [isPress, isDisable, isLoading, bg]);

        let fontColor = useMemo(() => {
            let color = lime[5];
            if (bg === "black") {
                color = grey[9];
            } else if (bg === "red") {
                color = red[4];
            }
            if (isDisable) color = grey[5];
            return color
        }, [isPress, isDisable, isLoading, bg]);

        return (
            <Pressable 
                style={{
                    width: '100%',
                    flexDirection: 'row',
                    alignContent: 'center',
                    justifyContent: 'center',
                    borderWidth: 1,
                    borderRadius: 4,
                    paddingVertical: 12 * size,
                    paddingHorizontal:12 * size,
                    backgroundColor: backgroundColor,
                    borderColor: borderColor,
                }}
                onPressIn={() => {
                    setPress(true)
                }}
                onPressOut={() => {
                    setPress(false)
                }}
                onPress={() => {
                    onPress()
                }}
            >
                {
                    isLoading && 
                        <View style={{width: 20, height: 20}}>
                            <ActivityIndicator size={20}/>
                        </View>
                }
                <Text size={size} align="center" fw="bold" style={{flex: 1}} color={fontColor}>{title}</Text>
                {
                    isLoading && 
                        <View style={{width: 20, height: 20}}>
                        </View>
                }
            </Pressable>
        )
    } else if (type === "text") {

        let fontColor = useMemo(() => {
            let color = lime[4];
            if (bg ==="lime") {
                if (isPress) color = lime[5];
            }
            if (bg === "black") {
                color = grey[8];
                if (isPress) color = grey[9];
            }
            if (bg === "red") {
                color = red[4];
                if (isPress) color = red[5];
            }
            if (isDisable) color = grey[4]
            return color
        }, [isPress, isDisable, isLoading, bg]);

        return (
            <Pressable 
                style={{
                    width: '100%',
                    flexDirection: 'row',
                    alignContent: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0,0,0,0)',
                    height: 20, 
                }}
                onPressIn={() => {
                    setPress(true)
                }}
                onPressOut={() => {
                    setPress(false)
                }}
                onPress={() => {
                    onPress()
                }}
            >
                <Text size={size} align="center" fw="medium" style={{flex: 1}} color={fontColor}>{title}</Text>
            </Pressable>
        )

    } else if (type === "link") {
        
        let fontColor = useMemo(() => {
            let color = grey[9]
            return color
        }, [isPress, isDisable, isLoading, bg]);

        let borderColor = useMemo(() => {
            let color = lime[4];
            if (bg === "lime") {
                if (isPress) color = lime[5];
            } else if (bg === "black") {
                color = grey[8];
                if (isPress) color = grey[9];
            } else if (bg === "red") {
                color = red[4];
                if (isPress) color = red[5];
            } else if (bg === "yellow") {
                color = yellow[4];
                if (isPress) color = yellow[5];
            } else if (bg === "orange") {
                color = volcano[5];
                if (isPress) color = volcano[5];
            }
            if (isDisable) color = grey[6];
            return color
        }, [isPress, isDisable, isLoading, bg]);

        return (
            <Pressable 
                style={{
                    width: '100%',
                    flexDirection: 'column',
                    alignContent: 'center',
                    justifyContent: 'flex-end',
                    backgroundColor: 'rgba(0,0,0,0)',
                    height: 20, 
                }}
                onPressIn={() => {
                    setPress(true)
                }}
                onPressOut={() => {
                    setPress(false)
                }}
                onPress={() => {
                    onPress()
                }}
            >
                <Text size={size} align="center" fw="medium" style={{flex: 1}} color={fontColor}>{title}</Text>
                <View 
                    style={{
                        position:  'absolute',
                        width: '100%',
                        height: 5,
                        backgroundColor: borderColor,
                        opacity: 0.5,
                    }}
                />
            </Pressable>
        )

    } else {

        return (<></>)

    }

}
