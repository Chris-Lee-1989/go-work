/* eslint-disable react-native/no-inline-styles */
import {
  View,
  SafeAreaView,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import Header from '../../components/global/Header';
import {grey} from '@ant-design/colors';
import Button from '../../components/input/Button';
import {useRecoilState} from 'recoil';
import workerState from '../../atoms/workerState';
import useAxios from '../../modules/useAxios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Text from '../../components/text/Text';
import {faChevronCircleRight} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

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

  // 로그아웃 로직
  const [logoutState, , _logout] = useAxios('post', '/v1/gowork/auth/logout');
  useEffect(() => {
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
        <View style={{marginBottom: 30, marginTop: 10, paddingLeft: 20}}>
          <Text fw="bold" size={1.2} color={grey[8]}>
            {worker.departmentName}{' '}
            {worker.level === '00'
              ? '팀원'
              : worker.level === '01'
              ? '팀장'
              : '대표'}{' '}
            {worker.nickname}
          </Text>
        </View>
        {worker.isAdmin === 'Y' && (
          <View
            style={{
              paddingHorizontal: 20,
              borderRadius: 4,
              backgroundColor: 'white',
              marginBottom: 20,
            }}>
            <TouchableOpacity
              onPress={() => props.navigation.push('departmentMngScreen')}
              style={{
                flexDirection: 'row',
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View style={{flex: 1}}>
                <Text fw="regular">부서 관리</Text>
              </View>
              <View>
                <FontAwesomeIcon
                  icon={faChevronCircleRight}
                  size={20}
                  color={grey[1]}
                />
              </View>
            </TouchableOpacity>
            <View style={{height: 1, backgroundColor: grey[0]}} />
            <TouchableOpacity
              onPress={() => props.navigation.push('workerMngScreen')}
              style={{
                flexDirection: 'row',
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View style={{flex: 1}}>
                <Text fw="regular">직원 관리</Text>
              </View>
              <View>
                <FontAwesomeIcon
                  icon={faChevronCircleRight}
                  size={20}
                  color={grey[1]}
                />
              </View>
            </TouchableOpacity>
          </View>
        )}
        <View
          style={{
            paddingHorizontal: 20,
            borderRadius: 4,
            backgroundColor: 'white',
            marginBottom: 20,
          }}>
          <TouchableOpacity
            onPress={() => props.navigation.push('passwordScreen')}
            style={{
              flexDirection: 'row',
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View style={{flex: 1}}>
              <Text fw="regular">비밀번호 변경</Text>
            </View>
            <View>
              <FontAwesomeIcon
                icon={faChevronCircleRight}
                size={20}
                color={grey[1]}
              />
            </View>
          </TouchableOpacity>
          <View style={{height: 1, backgroundColor: grey[0]}} />
          <TouchableOpacity
            onPress={() => props.navigation.push('myInfoScreen')}
            style={{
              flexDirection: 'row',
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View style={{flex: 1}}>
              <Text fw="regular">내 정보 변경</Text>
            </View>
            <View>
              <FontAwesomeIcon
                icon={faChevronCircleRight}
                size={20}
                color={grey[1]}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <Button title="로그아웃" onPress={() => onClickLogoutButton()} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
