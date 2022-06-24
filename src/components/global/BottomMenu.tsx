/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {lime, grey} from '@ant-design/colors';
import {Pressable, SafeAreaView, View} from 'react-native';
import Text from '../text/Text';

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
          height: 50,
        }}>
        {props.state.routes.map((route: any, idx: number) => {
          const isFocused = props.state.index === idx;
          //   let icon = null;
          let text = route.name === 'workRouter' ? '출/퇴근' : '';
          return (
            <Pressable
              key={idx}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                height: 50,
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
                  borderRadius: 100,
                  paddingVertical: 6,
                  paddingHorizontal: 12,
                  backgroundColor: isFocused ? lime[3] : 'white',
                }}>
                <Text
                  size={0.85}
                  fw={isFocused ? 'bold' : 'regular'}
                  color={isFocused ? grey[9] : grey[5]}
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
