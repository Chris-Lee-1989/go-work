// 라이브러리
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// 네비게이션
const Stack = createNativeStackNavigator();

// 컴포넌트
import HomeScreen from '../screens/settings/Home';
import DepartmentMngScreen from '../screens/settings/DepartmentMngScreen';
import WorkerMngScreen from '../screens/settings/WorkerMngScreen';
export default function OutRouter() {
  // 초기 데이터 조회 완료
  return (
    <Stack.Navigator initialRouteName={'homeScreen'}>
      <Stack.Screen
        name="homeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name="departmentMngScreen"
        component={DepartmentMngScreen}
        options={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name="workerMngScreen"
        component={WorkerMngScreen}
        options={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      />
    </Stack.Navigator>
  );
}
