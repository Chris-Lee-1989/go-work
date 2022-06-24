/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {ActivityIndicator, Dimensions} from 'react-native';
import {useRecoilValue} from 'recoil';
import spinnerState from '../../atoms/spinnerState';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated';

export default function SpinnerComp() {
  const SCREEN_HEIGHT = Dimensions.get('screen').height;
  const SCREEN_WIDTH = Dimensions.get('screen').width;

  // 로딩 여부 확인
  const isSpinner = useRecoilValue(spinnerState);

  // 배경 투명도
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (isSpinner) {
      opacity.value = 1;
    } else {
      opacity.value = 0;
    }
  }, [isSpinner, opacity]);

  const opacityAniStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(opacity.value, {duration: isSpinner ? 300 : 300}),
    };
  });

  // 스피너 표시
  if (isSpinner) {
    return (
      <Animated.View
        style={[
          {
            position: 'absolute',
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT,
            backgroundColor: 'rgba(0,0,0,0.1)',
            zIndex: 999,
            alignItems: 'center',
            justifyContent: 'center',
          },
          opacityAniStyle,
        ]}>
        <ActivityIndicator size="large" color="white" />
      </Animated.View>
    );
  }

  // 스피너 숨김
  else {
    return <></>;
  }
}
