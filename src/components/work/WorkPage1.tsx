/* eslint-disable react-native/no-inline-styles */
import {
  View,
  RefreshControl,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import useAxios from '../../modules/useAxios';
import WeekWork from '../../types/WeekWork';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faChevronCircleLeft,
  faChevronCircleRight,
} from '@fortawesome/free-solid-svg-icons';
import {dateFormat} from '../../modules/utils';

// 캄퍼넌트
import WeekLing from './WorkWeekLing';
import Text from '../text/Text';
import {grey, lime} from '@ant-design/colors';

interface Props {
  isSelected: boolean;
}
export default function WorkPage1(props: Props) {
  // 오늘 날짜 객체
  const today = new Date();
  const [year, setYear] = useState(
    String(today.getFullYear()).padStart(4, '0'),
  );
  const [month, setMonth] = useState(
    String(today.getMonth() + 1).padStart(2, '0'),
  );
  const [day, setDay] = useState(String(today.getDate()).padStart(2, '0'));
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
  const _search = useCallback(() => {
    select({year, month, day});
  }, [day, month, select, year]);

  useEffect(() => {
    if (selectState === 'done') {
      if (isSelected) {
        _search();
      }
    }
  }, [_search, selectState, selectRes, isSelected]);

  // 날짜 컨트롤 버튼 클릭 이벤트
  const _onClickDateButton = useCallback((type: 'minus' | 'plus') => {
    if (type === 'minus') {
      today.setDate(today.getDate() - 7);
    } else {
      today.setDate(today.getDate() + 7);
    }
    setYear(String(today.getFullYear()).padStart(4, '0'));
    setMonth(String(today.getMonth() + 1).padStart(2, '0'));
    setDay(String(today.getDate()).padStart(2, '0'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 날짜 변경 시 데이터 조회
  useEffect(() => {
    _search();
  }, [_search, day]);

  let workingTime = 0;

  return (
    <View style={{height: SCREEN_HEIGHT - 235}}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isRefresh} onRefresh={_search} />
        }>
        {selectRes ? (
          // 데이터 조회 완료
          <View
            style={{
              flex: 1,
              padding: 20,
            }}>
            <View
              style={{
                marginBottom: 20,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                style={{padding: 12}}
                onPress={() => _onClickDateButton('minus')}>
                <FontAwesomeIcon
                  icon={faChevronCircleLeft}
                  size={20}
                  color={grey[4]}
                />
              </TouchableOpacity>
              <Text size={1.2}>
                {dateFormat(selectRes[0].date, '-')} ~{' '}
                {dateFormat(selectRes[6].date, '-')}
              </Text>
              <TouchableOpacity
                style={{padding: 12}}
                onPress={() => _onClickDateButton('plus')}>
                <FontAwesomeIcon
                  icon={faChevronCircleRight}
                  size={20}
                  color={grey[4]}
                />
              </TouchableOpacity>
            </View>
            {selectRes.map((week: WeekWork, idx: number) => {
              workingTime += week.workingTime ? Number(week.workingTime) : 0;
              return <WeekLing key={idx} isActive={isSelected} data={week} />;
            })}
            {(() => {
              const workingHour = Math.floor(workingTime / 3600);
              const workingMin = Math.floor((workingTime % 3600) / 60);
              const workingSec = (workingTime % 3600) % 60;
              return (
                <View
                  style={{
                    padding: 20,
                    borderRadius: 4,
                    backgroundColor: grey[9],
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text size={0.9} color={grey[0]} fw="regular">
                      이번주{' '}
                    </Text>
                    <Text size={1.1} color={lime[4]} fw="bold">
                      {workingHour}
                    </Text>
                    <Text size={0.9} color={grey[0]} fw="regular">
                      시간{' '}
                    </Text>
                    <Text size={1.1} color={lime[4]} fw="bold">
                      {workingMin}
                    </Text>
                    <Text size={0.9} color={grey[0]} fw="regular">
                      분{' '}
                    </Text>
                    <Text size={1.1} color={lime[4]} fw="bold">
                      {workingSec}
                    </Text>
                    <Text size={0.9} color={grey[0]} fw="regular">
                      초 근무
                    </Text>
                  </View>
                </View>
              );
            })()}
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
