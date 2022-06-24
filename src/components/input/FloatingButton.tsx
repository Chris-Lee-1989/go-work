import { View, Text, Dimensions, TouchableHighlight, TouchableOpacity } from 'react-native'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { grey, lime } from '@ant-design/colors';

interface Props {
    size?:number;
    icon?: any;
    bottom?: number;
    right?: number;
    onPress: () => void;
    color?: string;
}

export default function PloatingButton({icon, onPress, bottom=24, right=24, size=50, color=lime[3]}: Props) {
    
    // 스크린 사이즈
    const SCREEN_HEIGHT = Dimensions.get('screen').height;
    const SCREEN_WIDTH = Dimensions.get('screen').width;

    return (
        <TouchableOpacity 
            style={{
                position: 'absolute',
                backgroundColor: color,
                width: size, height: size,
                bottom: bottom, right: right, borderRadius: 100, 
                justifyContent: 'center', alignItems: 'center',
                shadowColor: "#000",
                shadowOffset: {
                    width: 3,
                    height: 3,
                },
                shadowOpacity: 0.2,
                shadowRadius: 3.84,
                elevation: 6,
            }}
            onPress={onPress}
        >
            {icon ? icon : 
            <FontAwesomeIcon
                icon={faPlus}
                    size={20}
                    color={grey[9]}
                />
            }
        </TouchableOpacity>
    )
}