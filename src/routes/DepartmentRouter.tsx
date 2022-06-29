// 라이브러리
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// 네비게이션
const Stack = createNativeStackNavigator();

// 컴포넌트
import DepartmentScreen from '../screens/department/DepartmentScreen';
export default function OutRouter() {
  // 초기 데이터 조회 완료
  return (
    <Stack.Navigator initialRouteName={'departmentScreen'}>
      <Stack.Screen
        name="departmentScreen"
        component={DepartmentScreen}
        options={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      />
    </Stack.Navigator>
  );
}
