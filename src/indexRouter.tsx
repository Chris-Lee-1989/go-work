/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
// 라이브러리
import React, {useCallback, useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRecoilState} from 'recoil';
import workerState from './atoms/workerState';
import {SafeAreaView, ActivityIndicator} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import useAxios from './modules/useAxios';

// 네비게이션
const Stack = createNativeStackNavigator();

// 컴포넌트
import LoginScreen from './screens/Login';
import TabRouter from './routes/TabRouter';

export default function indexRouter() {
  // 초기 데이터 조회 여부

  // 고객정보
  let [worker, setWorker] = useRecoilState(workerState);

  // 초기 데이터 설정
  const _init = useCallback(async () => {
    // 푸시 토큰
    let pushToken = await messaging().getToken();
    // 로그인
    if (worker.isLogin) {
    }
    // 비 로그인
    else {
      _token({pushToken: pushToken});
    }
  }, []);

  // 초기 설정
  useEffect(() => {
    _init();
  }, [_init]);

  // 토큰 검증
  const [tokenState, tokenRes, _token] = useAxios(
    'post',
    '/v1/gowork/auth/token',
  );
  useEffect(() => {
    if (tokenState === 'success') {
      AsyncStorage.setItem('access_token', tokenRes?.token);
      console.log({
        ...tokenRes,
        isLogin: true,
        isWork: tokenRes.isWork === 'Y',
        isAdmin: tokenRes.isAdmin,
      });
      setWorker({
        ...tokenRes,
        isLogin: true,
        isWork: tokenRes.isWork === 'Y',
        isAdmin: tokenRes.isAdmin,
      });
    }
  }, [setWorker, tokenRes, tokenState]);

  // 초기 데이터 조회 완료
  if (tokenState !== ('loading' || 'done')) {
    return (
      <Stack.Navigator
        initialRouteName={
          tokenState === 'success' ? 'tabRouter' : 'loginScreen'
        }>
        <Stack.Screen
          name="loginScreen"
          component={LoginScreen}
          options={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="tabRouter"
          component={TabRouter}
          options={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        />
      </Stack.Navigator>
    );
  }

  // 초기 데이터 조회 중
  else {
    return (
      <SafeAreaView
        style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }
}
