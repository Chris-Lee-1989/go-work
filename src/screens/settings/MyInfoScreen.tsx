/* eslint-disable react-native/no-inline-styles */
import {
  View,
  SafeAreaView,
  VirtualizedList,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Header from '../../components/global/Header';
import useAxios from '../../modules/useAxios';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTimes, faPen} from '@fortawesome/free-solid-svg-icons';

// 인터페이스
interface Props {
  navigation: any;
  route: any;
}

import DepartmentProps from '../../types/Department';
import Text from '../../components/text/Text';
import {grey, lime} from '@ant-design/colors';

export default function MyInfoScreen(props: Props) {
  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      {/* 헤더 */}
      <Header
        pageProps={props}
        title={'내 정보 변경'}
        backAction={() => props.navigation.pop()}
      />
      <ScrollView style={{flex: 1, padding: 20}}>

      </ScrollView>
    </SafeAreaView>
  );
}
