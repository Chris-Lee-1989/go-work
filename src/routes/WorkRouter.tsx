// 라이브러리
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// 네비게이션
const Stack = createNativeStackNavigator();

// 컴포넌트
import WorkScreen from '../screens/work/WorkScreen';
import WorkDashboardScreen from '../screens/work/WorkDashboardScreen';

export default function OutRouter() {
  // 초기 데이터 조회 완료
  return (
    <Stack.Navigator initialRouteName={'workScreen'}>
      <Stack.Screen
        name="workScreen"
        component={WorkScreen}
        options={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name="workDashboardScreen"
        component={WorkDashboardScreen}
        options={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      />
    </Stack.Navigator>
  );
}
