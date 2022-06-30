/* eslint-disable react-native/no-inline-styles */
import {
  Alert,
  Dimensions,
  Pressable,
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Header from '../../components/global/Header';
import {useRecoilState} from 'recoil';
import workerState from '../../atoms/workerState';
import {grey, lime, red} from '@ant-design/colors';
import Text from '../../components/text/Text';
import Button from '../../components/input/Button';
import useAxios from '../../modules/useAxios';
import Geolocation from 'react-native-geolocation-service';
import {useToast} from 'react-native-toast-notifications';

// 인터페이스
interface Props {
  navigation: any;
  route: any;
}

interface ILocation {
  latitude: number;
  longitude: number;
}

export default function WorkScreen(props: Props) {
  // Toast
  const toast = useToast();
  // 화면 높이
  const SCREEN_HEIGHT = Dimensions.get('screen').height;
  // 직원 정보
  const [worker, setWorker] = useRecoilState(workerState);

  // 출/퇴근 버튼 press 여부
  const [isPress, setPress] = useState<boolean>(false);

  // 출퇴근 정보 업데이트
  const [workingState, workingRes, _working] = useAxios(
    'post',
    '/v1/gowork/work/working',
  );
  useEffect(() => {
    if (workingState === 'success') {
      setWorker({...worker, isWork: workingRes?.isWork === 'Y'});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workingState]);

  // 출근 버튼 클릭 이벤트
  const clickStartButton = useCallback(() => {
    Alert.alert('알림', '출근하시겠어요?', [
      {text: '취소', style: 'cancel'},
      {
        text: '네',
        onPress: async () => {
          Geolocation.getCurrentPosition(
            // success callback
            position => {
              const {latitude, longitude} = position.coords;
              _working({isWork: 'Y', latitude, longitude});
            },
            // error callback
            error => {
              toast.show(`${error.code} ${error.message}`, {type: 'error'});
            },
            // options
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
          );
        },
      },
    ]);
  }, [_working, toast]);

  // 퇴근 버튼 클릭 이벤트
  const clickEndButton = useCallback(() => {
    Alert.alert('알림', '퇴근하시겠어요?', [
      {text: '취소', style: 'cancel'},
      {
        text: '네',
        onPress: async () => {
          _working({isWork: 'N'});
        },
      },
    ]);
  }, [_working]);

  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <Header pageProps={props} title={'출퇴근'} />
      <ScrollView style={{flex: 1}}>
        <View
          style={{
            height: SCREEN_HEIGHT - 180,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View style={{marginBottom: 50}}>
            <Text size={1.5}>{worker.nickname}님 안녕하세요?</Text>
          </View>
          <Pressable
            style={[
              {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 150,
                height: 150,
                borderRadius: 150,
                borderWidth: 1,
                borderColor: grey[9],
                backgroundColor: worker.isWork ? lime[3] : red[3],
                marginBottom: 50,
              },
              !isPress
                ? {
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 3,
                    },
                    shadowOpacity: 0.2,
                    shadowRadius: 3.84,
                    elevation: 6,
                  }
                : {
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 1,
                    },
                    shadowOpacity: 0.1,
                    shadowRadius: 3.84,
                    elevation: 1,
                  },
            ]}
            onPressIn={() => {
              setPress(true);
            }}
            onPressOut={() => {
              setPress(false);
            }}
            onPress={() => {
              if (worker.isWork) {
                clickEndButton();
              } else {
                clickStartButton();
              }
            }}>
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 140,
                height: 140,
                borderRadius: 130,
                borderWidth: 1,
                borderColor: grey[9],
                backgroundColor: grey[9],
              }}>
              <Text
                size={1.5}
                color={worker.isWork ? lime[3] : red[3]}
                fw="bold">
                {workingState === 'loading'
                  ? '로딩중..'
                  : worker.isWork
                  ? '퇴근하기'
                  : '출근하기'}
              </Text>
            </View>
          </Pressable>

          <View style={{width: 120, marginBottom: 50}}>
            <Button
              style={{marginTop: 40}}
              title="출/퇴근 기록 조회"
              type="link"
              bg="lime"
              onPress={() => {
                props.navigation.push('workDashboardScreen');
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
