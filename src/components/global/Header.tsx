/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Pressable, SafeAreaView, View} from 'react-native';
import {grey} from '@ant-design/colors';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import Text from '../text/Text';

// 인터페이스
interface naviProps {
  navigation: any;
  route: any;
}

interface Props {
  title: string;
  pageProps: naviProps;
  backAction?: () => void;
  leftIcon?: any;
}

export default function Header({
  //   pageProps,
  backAction,
  title,
  leftIcon,
}: Props) {
  const _backAction = () => {
    if (backAction) {
      backAction();
    }
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {backAction && (
        <Pressable
          style={{
            width: 50,
            height: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={_backAction}>
          <FontAwesomeIcon
            icon={leftIcon ? leftIcon : faArrowLeft}
            size={18}
            color={grey[9]}
          />
        </Pressable>
      )}
      <View style={{flex: 1}}>
        <Text size={1} color={grey[9]} align="center" fw="bold">
          {title}
        </Text>
      </View>
      {backAction && (
        <Pressable
          style={{
            width: 50,
            height: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}></Pressable>
      )}
    </SafeAreaView>
  );
}
