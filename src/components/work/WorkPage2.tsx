/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import {View, Dimensions, TouchableOpacity} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Text from '../text/Text';
import {gold, grey, lime, red} from '@ant-design/colors';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faCircle,
  faChevronCircleLeft,
  faChevronCircleRight,
} from '@fortawesome/free-solid-svg-icons';
import useAxios from '../../modules/useAxios';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import BottomModal from '../modal/BottomModal';
import {dateTimeFormat} from '../../modules/utils';

interface Props {
  isSelected: boolean;
}

export default function WorkPage2(props: Props) {
  // 오늘 날짜 객체
  const today = new Date();
  const [year, setYear] = useState(
    String(today.getFullYear()).padStart(4, '0'),
  );
  const [month, setMonth] = useState(
    String(today.getMonth() + 1).padStart(2, '0'),
  );
  // const [day, setDay] = useState(String(today.getDate()).padStart(2, '0'));
  // 마지막 일
  const lastDay = new Date(Number(year), Number(month), 0).getDate();
  // 첫 요일
  const firstDayLabel = new Date(Number(year), Number(month) - 1, 1).getDay();
  // 화면이 선택되었는지
  const {isSelected} = props;
  // 화면 사이즈
  const SCREEN_HEIGHT = Dimensions.get('screen').height;

  // 출퇴근 정보 업데이트
  const [selectState, selectRes, select] = useAxios(
    'get',
    '/v1/gowork/work/month',
  );

  // 이번주 출근 기록 조회
  const _search = useCallback(() => {
    select({year, month});
  }, [month, select, year]);
  useEffect(() => {
    if (selectState === 'done') {
      if (isSelected) {
        _search();
      }
    }
  }, [_search, selectState, selectRes, isSelected]);

  // 월 근무 시간
  let workingTime = 0;

  // 날짜 컨트롤 버튼 클릭 이벤트
  const _onClickDateButton = useCallback((type: 'minus' | 'plus') => {
    if (type === 'minus') {
      today.setMonth(today.getMonth() - 1);
    } else {
      today.setMonth(today.getMonth() + 1);
    }
    setYear(String(today.getFullYear()).padStart(4, '0'));
    setMonth(String(today.getMonth() + 1).padStart(2, '0'));
    // setDay(String(today.getDate()).padStart(2, '0'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 날짜 선택 이벤트
  const onClickDateCell = (data: any) => {
    toggleModal(true);
    setModalData(data);
  };

  // 모달 오픈 여부
  const [isModalView, toggleModal] = useState<boolean>(false);
  // 모델 데이터
  const [modalData, setModalData] = useState<any>(null);

  return (
    <View style={{height: SCREEN_HEIGHT - 235, paddingHorizontal: 20}}>
      <View
        style={{
          marginTop: 20,
          height: 50,
          backgroundColor: 'white',
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
        <Text size={1.1} fw="regular">
          {year}년 {month}월
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
      {/* 달력 */}
      <View style={{flex: 1}}>
        {/* 요일 */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              flex: 1,
              paddingVertical: 18,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
            }}>
            <Text size={0.8} fw="regular" color={grey[9]}>
              일
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              paddingVertical: 18,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
            }}>
            <Text size={0.8} fw="regular" color={grey[9]}>
              월
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              paddingVertical: 18,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
            }}>
            <Text size={0.8} fw="regular" color={grey[9]}>
              화
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              paddingVertical: 18,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
            }}>
            <Text size={0.8} fw="regular" color={grey[9]}>
              수
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              paddingVertical: 18,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
            }}>
            <Text size={0.8} fw="regular" color={grey[9]}>
              목
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              paddingVertical: 18,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
            }}>
            <Text size={0.8} fw="regular" color={grey[9]}>
              금
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              paddingVertical: 18,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
            }}>
            <Text size={0.8} fw="regular" color={grey[9]}>
              토
            </Text>
          </View>
        </View>
        {(() => {
          // 일자
          let forDay = 1;
          let rowMap = [];
          for (let row = 0; row < 6; row++) {
            rowMap.push(
              <View key={row} style={{flexDirection: 'row'}}>
                {(() => {
                  let colMap = [];
                  for (let col = 0; col < 7; col++) {
                    // 첫째주 일 때,
                    if (row === 0) {
                      // 시작일 이전
                      if (col < firstDayLabel) {
                        colMap.push(
                          <DayComp key={row + '-' + col} isEmpty={true} />,
                        );
                        // 시작일 이후
                      } else {
                        let data = null;
                        selectRes?.forEach((item: any) => {
                          if (
                            item.date ===
                            String(year) +
                              String(month) +
                              String(forDay).padStart(2, '0')
                          ) {
                            data = item;
                            workingTime += Number(item.workingTime);
                          }
                        });
                        colMap.push(
                          <DayComp
                            key={row + '-' + col}
                            day={forDay}
                            data={data}
                            onPress={(item: any) => onClickDateCell(item)}
                            isToday={false}
                            isSelected={isSelected}
                          />,
                        );
                        forDay++;
                      }
                      // 월에 마지막 일자까지 일자 표시,
                    } else if (forDay <= lastDay) {
                      let data = null;
                      selectRes?.forEach((item: any) => {
                        if (
                          item.date ===
                          String(year) +
                            String(month) +
                            String(forDay).padStart(2, '0')
                        ) {
                          data = item;
                          workingTime += Number(item.workingTime);
                        }
                      });
                      colMap.push(
                        <DayComp
                          key={row + '-' + col}
                          day={forDay}
                          data={data}
                          onPress={(item: any) => onClickDateCell(item)}
                          isToday={false}
                          isSelected={isSelected}
                        />,
                      );
                      forDay++;
                      // 월 마지막 일 이후
                    } else {
                      colMap.push(
                        <DayComp key={row + '-' + col} isEmpty={true} />,
                      );
                    }
                  }
                  return colMap;
                })()}
              </View>,
            );
          }
          return rowMap;
        })()}
      </View>
      {(() => {
        const workingHour = Math.floor(workingTime / 3600);
        const workingMin = Math.floor((workingTime % 3600) / 60);
        const workingSec = (workingTime % 3600) % 60;
        return (
          <View
            style={{
              marginBottom: 20,
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
                이번달{' '}
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
      <BottomModal
        height={280}
        isView={isModalView}
        onClose={() => toggleModal(false)}>
        {modalData && (
          <View style={{padding: 20, flex: 1}}>
            <View style={{flex: 1}}>
              <Text size={1}>{`${modalData.date.substring(
                0,
                4,
              )}년 ${modalData.date.substring(
                4,
                6,
              )}월 ${modalData.date.substring(6, 8)}일`}</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: 20,
                }}>
                <Text>첫 출근 시간</Text>
                <Text>{dateTimeFormat(modalData.firstTime, '-')}</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: 20,
                }}>
                <Text>마지막 퇴근 시간</Text>
                <Text>
                  {modalData.isToday === 'Y'
                    ? '현재 근무 중'
                    : dateTimeFormat(modalData.lastTime, '-')}
                </Text>
              </View>
            </View>
            {(() => {
              const workingHour = Math.floor(modalData.workingTime / 3600);
              const workingMin = Math.floor(
                (modalData.workingTime % 3600) / 60,
              );
              const workingSec = (modalData.workingTime % 3600) % 60;
              return (
                <View
                  style={{
                    marginBottom: 20,
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
                      총 근무 시간{' '}
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
        )}
      </BottomModal>
    </View>
  );
}

const DayComp = ({
  day,
  data,
  onPress,
  isEmpty = false,
  isToday,
  isSelected = false,
}: any) => {
  // 애니메이션 변수
  const aniOpacity = useSharedValue(0);
  const aniPadding = useSharedValue(0);
  // 애니메이션 스타일
  const opacityStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(aniOpacity.value, {duration: 500}),
      paddingBottom: withTiming(aniPadding.value, {duration: 300}),
    };
  });

  // 화면 선택 시
  useEffect(() => {
    if (isSelected) {
      aniOpacity.value = 1;
      aniPadding.value = 30;
    } else {
      aniOpacity.value = 0;
      aniPadding.value = 0;
    }
  }, [aniPadding, aniOpacity, isSelected]);

  const SCREEN_WIDTH = Dimensions.get('screen').width;
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        height: isEmpty ? 0 : SCREEN_WIDTH / 7,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
      onPress={() => {
        if (data) {
          onPress(data);
        }
      }}>
      {/* 일자가 있을 때 */}
      {day ? (
        <>
          <View
            style={[
              {
                borderRadius: SCREEN_WIDTH,
                width: 30,
                height: 30,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 2,
              },
            ]}>
            <Animated.View style={[opacityStyle, {position: 'absolute'}]}>
              <FontAwesomeIcon
                icon={faCircle}
                size={6}
                color={
                  data
                    ? data.workingPercent >= 1
                      ? lime[4]
                      : data.workingPercent < 0.5
                      ? red[4]
                      : gold[3]
                    : 'white'
                }
              />
            </Animated.View>
            <View>
              <Text
                size={1}
                fw={data ? 'medium' : 'regular'}
                color={isToday ? lime[4] : data ? grey[9] : grey[4]}
                align="center">
                {day}
              </Text>
            </View>
          </View>
        </>
      ) : null}
    </TouchableOpacity>
  );
};
