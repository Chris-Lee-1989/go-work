/* eslint-disable react-native/no-inline-styles */
// 라이브러리
import React, {useEffect} from 'react';
import {View, Modal, Pressable} from 'react-native';
import {grey} from '@ant-design/colors';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated';

// 인터페이스
interface Props {
  isView: boolean;
  onClose: () => void;
  children: any;
  height?: any;
}

export default function BottomModal({
  isView,
  onClose,
  children,
  height = 200,
}: Props) {
  // 닫기 요청
  const _requestClose = () => {
    opacity.value = 0;
    onClose();
  };

  // 배경 투명도
  const opacity = useSharedValue(0);

  const opacityAniStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(opacity.value, {duration: isView ? 600 : 200}),
    };
  });

  useEffect(() => {
    if (isView) {
      opacity.value = 1;
    } else {
      opacity.value = 0;
    }
  }, [isView, opacity]);

  return (
    <Modal animationType="slide" transparent={true} visible={isView}>
      <View style={{flex: 1}}>
        {/* 배경 */}
        <Pressable style={{flex: 1}} onPress={_requestClose}>
          <Animated.View
            style={[
              {flex: 1, backgroundColor: 'rgba(0,0,0,0.2)'},
              opacityAniStyle,
            ]}
          />
        </Pressable>
        {/* 콘텐츠 */}
        <View
          style={{
            flexBasis: height,
            borderTopWidth: 1,
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderColor: grey[3],
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 0.2,
            shadowRadius: 2,
            elevation: 6,
            backgroundColor: grey[0],
          }}>
          <Pressable
            onPressIn={_requestClose}
            style={{
              flexBasis: 14,
              backgroundColor: 'rgba(0,0,0,0)',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View style={{backgroundColor: grey[4], height: 1, width: 20}} />
            <View
              style={{
                backgroundColor: grey[4],
                height: 1,
                width: 20,
                margin: 1,
              }}
            />
            <View style={{backgroundColor: grey[4], height: 1, width: 20}} />
          </Pressable>
          <View style={{flex: 1, backgroundColor: grey[0]}}>{children}</View>
        </View>
      </View>
    </Modal>
  );
}
