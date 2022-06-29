/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {lime, grey} from '@ant-design/colors';
import {Pressable, SafeAreaView, View} from 'react-native';
import Text from '../text/Text';
import {
  faMapMarkedAlt,
  faWrench,
  faBuilding,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

export default function BottomMenu(props: any) {
  return (
    <SafeAreaView
      style={{
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: grey[1],
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        elevation: 6,
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          height: 60,
        }}>
        {props.state.routes.map((route: any, idx: number) => {
          const isFocused = props.state.index === idx;
          let text =
            route.name === 'workRouter'
              ? '출/퇴근'
              : route.name === 'settingsRouter'
              ? '설정'
              : route.name === 'departmentRouter'
              ? '부서'
              : '';
          let icon =
            route.name === 'workRouter'
              ? faMapMarkedAlt
              : route.name === 'settingsRouter'
              ? faWrench
              : route.name === 'departmentRouter'
              ? faBuilding
              : faWrench;
          return (
            <Pressable
              key={idx}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                const event = props.navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                });
                if (!isFocused && !event.defaultPrevented) {
                  props.navigation.navigate({name: route.name, merge: true});
                }
              }}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <FontAwesomeIcon
                  icon={icon}
                  size={20}
                  color={isFocused ? lime[4] : grey[2]}
                />
                <View style={{height: 4}} />
                <Text
                  size={0.6}
                  fw={isFocused ? 'bold' : 'medium'}
                  color={isFocused ? lime[4] : grey[2]}
                  align="center">
                  {text}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    </SafeAreaView>
  );
}
