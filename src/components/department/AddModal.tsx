/* eslint-disable react-native/no-inline-styles */
import {grey, lime} from '@ant-design/colors';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import useAxios from '../../modules/useAxios';
import DepartmentProps from '../../types/Department';
import Button from '../input/Button';
import Input from '../input/Input';
import Text from '../text/Text';

interface AddWorkerModalProps {
  isViewModal: boolean;
  onClose: () => void;
}

export default function AddWorkerModal({
  isViewModal,
  onClose,
}: AddWorkerModalProps) {
  // 폼 데이터
  const [departmentName, setDepartmentName] = useState<string>('');

  // 초기화
  const _init = () => {
    setDepartmentName('');
  };

  // 팝업 시 실행
  useEffect(() => {
    if (isViewModal) {
      _init();
    }
  }, [isViewModal]);

  // 부서 추가 버튼 활성화
  const isDisabled = useMemo(() => {
    let disable = false;
    if (!departmentName) {
      disable = true;
    }
    return disable;
  }, [departmentName]);

  // 부서 추가 로직
  const [insertState, , _insert] = useAxios('post', '/v1/gowork/department');
  useEffect(() => {
    if (insertState === 'success') {
      onClose();
    }
  }, [insertState, onClose]);

  // 부서 추가 버튼 클릭 이벤트
  const onPressInsertButton = () => {
    _insert({
      departmentName,
    });
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <SafeAreaView style={{flex: 1}}>
        <ScrollView style={{flex: 1, padding: 20}}>
          {/* 이름 */}
          <Text
            style={{marginBottom: 8}}
            size={0.8}
            fw="regular"
            color={grey[9]}>
            부서명
          </Text>
          <Input
            type="text"
            value={departmentName}
            onChange={(value: string) => setDepartmentName(value)}
          />
        </ScrollView>
        <View style={{padding: 20}}>
          <Button
            title="부서 추가하기"
            onPress={onPressInsertButton}
            isDisable={isDisabled}
            isLoading={insertState === 'loading'}
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
