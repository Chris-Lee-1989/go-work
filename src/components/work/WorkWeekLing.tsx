/* eslint-disable react-native/no-inline-styles */
import {Dimensions, View} from 'react-native';
import React, {useEffect} from 'react';
import {dateFormat} from '../../modules/utils';
import WeekWork from '../../types/WeekWork';
import Text from '../text/Text';
import {gold, grey, lime, red} from '@ant-design/colors';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

// 인터페이스
interface Props {
  isActive: boolean;
  data: WeekWork;
}

export default function WorkWeekLing({data, isActive}: Props) {
  // 요일
  const labelArr = ['월', '화', '수', '목', '금', '토', '일'];
  // 근무시간(초)
  const workingTime = data.workingTime ? Number(data.workingTime) : 0;
  // 스크린 너빕
  const SCREEN_WIDTH = Dimensions.get('screen').width;

  // 애니메이션 변수
  const aniWidth = useSharedValue(0);
  // 애니메이션 스타일
  const widthStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(aniWidth.value, {duration: 500}),
    };
  });

  // 화면이 활성화 되면,
  useEffect(() => {
    if (isActive) {
      const width =
        (SCREEN_WIDTH - 44) *
        (data.isHoliday !== 'Y' ? data.workingPercent : 1);
      setTimeout(() => {
        aniWidth.value = width;
      }, 100);
    } else {
      aniWidth.value = 0;
    }
  }, [SCREEN_WIDTH, aniWidth, data.isHoliday, isActive, data.workingPercent]);

  return (
    <View
      style={{
        marginBottom: 20,
      }}>
      <View style={{marginBottom: 8}}>
        <Text fw="regular">
          {data.date ? dateFormat(data.date, '-') : data.date} (
          {labelArr[data.weekday ? data.weekday : 0]})
        </Text>
      </View>
      <View
        style={{
          height: 20,
          borderRadius: 4,
          backgroundColor: grey[9],
          justifyContent: 'center',
        }}>
        {data.isHoliday !== 'Y' ? (
          <Animated.View
            style={[
              {
                // width: (SCREEN_WIDTH - 44) * percent,
                height: 16,
                borderRadius: 2,
                backgroundColor:
                  data.workingPercent < 0.3
                    ? red[3]
                    : data.workingPercent < 1
                    ? gold[3]
                    : lime[3],
                alignItems: 'flex-end',
                justifyContent: 'center',
                marginLeft: 2,
              },
              widthStyle,
            ]}>
            <View style={{paddingRight: 8}}>
              <Text fw="regular" size={0.6} align="right">
                {workingTime
                  ? `${data.workingHour}시간 ${data.workingMin}분 근무`
                  : workingTime}
              </Text>
            </View>
          </Animated.View>
        ) : (
          <Animated.View
            style={[
              {
                // width: SCREEN_WIDTH - 44,
                height: 16,
                borderRadius: 2,
                backgroundColor: grey[4],
                alignItems: 'flex-end',
                justifyContent: 'center',
                marginLeft: 2,
              },
              widthStyle,
            ]}>
            <View style={{paddingRight: 8}}>
              <Text fw="regular" size={0.6} align="right">
                {data.holidayName ? data.holidayName : '공휴일'}
              </Text>
            </View>
          </Animated.View>
        )}
      </View>
    </View>
  );
}
