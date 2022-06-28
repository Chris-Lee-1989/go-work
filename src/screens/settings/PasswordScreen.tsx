/* eslint-disable react-native/no-inline-styles */
import {View, SafeAreaView, ScrollView, Alert} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import Header from '../../components/global/Header';
import useAxios from '../../modules/useAxios';
import Input from '../../components/input/Input';
import Text from '../../components/text/Text';
import {grey, red} from '@ant-design/colors';
import Button from '../../components/input/Button';
import {useRecoilState} from 'recoil';
import workerState from '../../atoms/workerState';

// 인터페이스
interface Props {
  navigation: any;
  route: any;
}

export default function PasswordScreen(props: Props) {
  // 작업자 정보
  const [worker] = useRecoilState(workerState);
  // 폼 데이터
  const [currPassword, setCurrPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [newPasswordConf, setNewPasswordConf] = useState<string>('');
  // 직원 수정 로직
  const [updateState, , _update] = useAxios(
    'patch',
    '/v1/gowork/worker/password',
  );
  useEffect(() => {
    if (updateState === 'success') {
      Alert.alert('알림', '비밀번호가 변경되었어요.');
      props.navigation.pop();
    }
  }, [props.navigation, updateState]);

  // 직원 수정 버튼 클릭 이벤트
  const onPressUpdateButton = () => {
    _update({
      workerKey: worker.workerKey,
      currPassword,
      newPassword,
    });
  };

  // 버튼 활성화
  const {isDisable, errorMessage} = useMemo(() => {
    let disable = false;
    let message = '';
    if (!currPassword || !newPassword || !newPasswordConf) {
      disable = true;
      message = '';
    } else if (newPassword !== newPasswordConf) {
      disable = true;
      message = '새로운 비밀번호 두개가 같아야 해요.';
    } else if (currPassword === newPasswordConf) {
      disable = true;
      message = '현재 비밀번호와 새로운 비밀번호가 같아요.';
    }
    return {isDisable: disable, errorMessage: message};
  }, [currPassword, newPassword, newPasswordConf]);
  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      {/* 헤더 */}
      <Header
        pageProps={props}
        title={'비밀번호 변경'}
        backAction={() => props.navigation.pop()}
      />
      <ScrollView style={{flex: 1, padding: 20}}>
        {/* 현재 비밀번호 */}
        <Text style={{marginBottom: 8}} size={0.8} fw="regular" color={grey[9]}>
          현재 비밀번호
        </Text>
        <Input
          type="password"
          value={currPassword}
          onChange={(value: string) => setCurrPassword(value)}
        />
        {/* 현재 비밀번호 */}
        <Text
          style={{marginBottom: 8, marginTop: 20}}
          size={0.8}
          fw="regular"
          color={grey[9]}>
          새로운 비밀번호
        </Text>
        <Input
          type="password"
          value={newPassword}
          onChange={(value: string) => setNewPassword(value)}
        />
        {/* 현재 비밀번호 */}
        <Text
          style={{marginBottom: 8, marginTop: 20}}
          size={0.8}
          fw="regular"
          color={grey[9]}>
          새로운 비밀번호 확인
        </Text>
        <Input
          type="password"
          value={newPasswordConf}
          onChange={(value: string) => setNewPasswordConf(value)}
        />
      </ScrollView>
      <View style={{padding: 20}}>
        {errorMessage !== '' && (
          <View
            style={{
              backgroundColor: red[0],
              marginBottom: 12,
              padding: 8,
              borderRadius: 4,
            }}>
            <Text align="center" size={0.8} fw="regular" color={red[5]}>
              {errorMessage}
            </Text>
          </View>
        )}
        <Button
          title="비밀번호 변경"
          isDisable={isDisable}
          isLoading={updateState === 'loading'}
          onPress={onPressUpdateButton}
        />
      </View>
    </SafeAreaView>
  );
}
