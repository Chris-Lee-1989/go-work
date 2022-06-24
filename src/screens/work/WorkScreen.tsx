/* eslint-disable react-native/no-inline-styles */
import {Alert, Pressable, SafeAreaView, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Header from '../../components/global/Header';
import {useRecoilState, useSetRecoilState} from 'recoil';
import workerState from '../../atoms/workerState';
import {grey, lime, red} from '@ant-design/colors';
import Text from '../../components/text/Text';
import Button from '../../components/input/Button';
import useAxios from '../../modules/useAxios';
import spinnerState from '../../atoms/spinnerState';

// 인터페이스
interface Props {
  navigation: any;
  route: any;
}

export default function WorkScreen(props: Props) {
  // 직원 정보
  const [worker, setWorker] = useRecoilState(workerState);

  // 출/퇴근 버튼 press 여부
  const [isPress, setPress] = useState<boolean>(false);

  // 스피너
  const setSpinner = useSetRecoilState(spinnerState);

  // 출퇴근 정보 업데이트
  const [workingState, workingRes, _working] = useAxios(
    'post',
    '/v1/gowork/work/working',
  );
  useEffect(() => {
    if (workingState === 'loading') {
      setSpinner(true);
    } else {
      setSpinner(false);
      if (workingState === 'success') {
        setWorker({...worker, isWork: workingRes?.isWork === 'Y'});
      }
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
          _working({isWork: 'Y'});
        },
      },
    ]);
  }, [_working]);

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
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
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
              marginBottom: 32,
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
            <Text size={1.5} color={worker.isWork ? lime[3] : red[3]} fw="bold">
              {worker.isWork ? '퇴근하기' : '출근하기'}
            </Text>
          </View>
        </Pressable>

        <View style={{width: 120}}>
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
    </SafeAreaView>
  );
}
