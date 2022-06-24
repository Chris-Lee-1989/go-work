/* eslint-disable react-native/no-inline-styles */
import {
  View,
  RefreshControl,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import useAxios from '../../modules/useAxios';
import WeekWork from '../../types/WeekWork';

// 캄퍼넌트
import WeekLing from './WorkWeekLing';

interface Props {
  isSelected: boolean;
}

export default function WorkPage1(props: Props) {
  // 화면이 선택되었는지
  const {isSelected} = props;
  // 화면 사이즈
  const SCREEN_HEIGHT = Dimensions.get('screen').height;
  // 새로고침 여부
  const [isRefresh] = useState<boolean>(false);
  // 출퇴근 정보 업데이트
  const [selectState, selectRes, select] = useAxios(
    'get',
    '/v1/gowork/work/week',
  );

  // 이번주 출근 기록 조회
  useEffect(() => {
    if (selectState === 'done') {
      if (isSelected) {
        select();
      }
    }
  }, [select, selectState, selectRes, isSelected]);

  return (
    <View style={{flex: 1}}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isRefresh} onRefresh={select} />
        }>
        {selectRes ? (
          // 데이터 조회 완료
          <View
            style={{
              padding: 20,
            }}>
            {selectRes.map((week: WeekWork, idx: number) => {
              return <WeekLing key={idx} isActive={isSelected} data={week} />;
            })}
          </View>
        ) : (
          // 데이터 조회중
          <View
            style={{
              height: SCREEN_HEIGHT - 250,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ActivityIndicator size="large" />
          </View>
        )}
      </ScrollView>
    </View>
  );
}
