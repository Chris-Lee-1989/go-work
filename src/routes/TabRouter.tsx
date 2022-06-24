// 라이브러리
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

import BottomMenu from '../components/global/BottomMenu';
import WorkRouter from './WorkRouter';

export default function TapRouter() {
  return (
    <Tab.Navigator
      initialRouteName="workRouter"
      tabBar={props => <BottomMenu {...props} />}
      screenOptions={() => ({
        headerShown: false,
      })}>
      <Tab.Screen
        name="workRouter"
        component={WorkRouter}
        options={{
          // 진입 시 새로고침
          unmountOnBlur: true,
        }}
      />
    </Tab.Navigator>
  );
}
