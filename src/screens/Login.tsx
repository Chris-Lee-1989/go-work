/* eslint-disable react-native/no-inline-styles */
import {View, SafeAreaView, KeyboardAvoidingView, Platform} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import useAxios from '../modules/useAxios';
import spinnerState from '../atoms/spinnerState';
import {useRecoilState, useSetRecoilState} from 'recoil';
import AsyncStorage from '@react-native-async-storage/async-storage';
import workerState from '../atoms/workerState';
import {useToast} from 'react-native-toast-notifications';
import {grey} from '@ant-design/colors';

import Text from '../components/text/Text';
import TextField from '../components/input/Input';
import Button from '../components/input/Button';
import messaging from '@react-native-firebase/messaging';

// 인터페이스
interface Props {
  navigation: any;
  route: any;
}

export default function Login(props: Props) {
  // 마운트 시 실행
  useEffect(() => {
    _getPushToken();
  }, []);

  const [pushToken, setPushToken] = useState<string | undefined>(undefined);
  const _getPushToken = async () => {
    // 푸시 토큰
    let fcmToken = await messaging().getToken();
    setPushToken(fcmToken);
  };

  // Toast
  const toast = useToast();

  // 고객정보
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let [worker, setWorker] = useRecoilState(workerState);

  // 로딩 스피너
  const setSpinner = useSetRecoilState(spinnerState);

  // 로그인 데이터
  const [email, setEmail] = useState<string>('');
  const [pw, setPW] = useState<string>('');

  // 로그인 로직
  const onPressLoginButton = () => {
    if (email && pw) {
      _login({email, password: pw, pushToken: pushToken});
    } else {
      toast.show('로그인 정보를 확인해주세요.', {type: 'warning'});
    }
  };

  // 로그인 완료 처리 로직
  const successLogin = useCallback(
    async (res: any) => {
      // eslint-disable-next-line no-shadow
      let {token, worker} = res;
      await AsyncStorage.setItem('access_token', token);
      setWorker({
        ...worker,
        isLogin: true,
        isWork: worker.isWork === 'Y',
      });
      props.navigation.replace('tabRouter');
    },
    [props.navigation, setWorker],
  );

  // 로그인 로직
  const [loginState, loginRes, _login] = useAxios(
    'post',
    '/v1/gowork/auth/login',
  );
  useEffect(() => {
    if (loginState === 'loading') {
      setSpinner(true);
    } else {
      setSpinner(false);
      if (loginState === 'success') {
        successLogin(loginRes);
      }

      if (loginState === 'error') {
        toast.show(loginRes.message, {type: 'warning'});
      }
    }
  }, [loginRes, loginState, setSpinner, successLogin, toast]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <SafeAreaView
        style={{
          backgroundColor: grey[0],
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={{width: '80%', marginBottom: 40}}>
          <Text size={2} fw="bold" align="center">
            꽃팜 출퇴근 기록부
          </Text>
          <View style={{height: 8}} />
          <Text size={0.8} fw="regular" align="center" color={grey[5]}>
            아이디는 회사메일, 초기비번은 1234
          </Text>
          <View style={{padding: 8}} />

          <View>
            <TextField
              size={1}
              type="email"
              placeholder="아이디"
              value={email}
              onChange={value => setEmail(value)}
              isReadOnly={loginState === 'loading'}
            />
            <View style={{padding: 4}} />
            <TextField
              type="password"
              size={1}
              placeholder="비밀번호"
              value={pw}
              onChange={value => setPW(value)}
              isReadOnly={loginState === 'loading'}
            />
            <View style={{padding: 4}} />
            <Button
              bg="black"
              title="로그인"
              isLoading={loginState === 'loading'}
              onPress={onPressLoginButton}
            />
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
