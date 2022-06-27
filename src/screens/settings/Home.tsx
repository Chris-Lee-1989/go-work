/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import {View, SafeAreaView, ScrollView, Alert} from 'react-native';
import React, {useEffect} from 'react';
import Header from '../../components/global/Header';
import {grey} from '@ant-design/colors';
import Button from '../../components/input/Button';
import {useRecoilState} from 'recoil';
import workerState from '../../atoms/workerState';
import useAxios from '../../modules/useAxios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 인터페이스
interface Props {
  navigation: any;
  route: any;
}

export default function Home(props: Props) {
  // 작업자 정보
  const [worker] = useRecoilState(workerState);

  // 로그아웃 버튼 클릭 이벤트
  const onClickLogoutButton = () => {
    Alert.alert('알림', '로그아웃 하시겠습니까?', [
      {text: '취소', style: 'cancel'},
      {
        text: '네',
        onPress: async () => {
          _logout({email: worker.email});
        },
      },
    ]);
  };

  // 로그인 로직
  const [logoutState, , _logout] = useAxios('post', '/v1/gowork/auth/logout');
  useEffect(() => {
    console.log(logoutState);
    if (logoutState === 'success') {
      AsyncStorage.setItem('access_token', '');
      props.navigation.replace('loginScreen');
    }
  }, [logoutState, props.navigation]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      {/* 헤더 */}
      <Header pageProps={props} title={'설정'} />
      <ScrollView style={{flex: 1, backgroundColor: grey[0], padding: 20}}>
        <View>
          <Button title="로그아웃" onPress={() => onClickLogoutButton()} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
