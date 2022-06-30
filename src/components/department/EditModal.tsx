/* eslint-disable react-native/no-inline-styles */
import {grey} from '@ant-design/colors';
import React, {useEffect, useMemo, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';
import useAxios from '../../modules/useAxios';
import DepartmentProps from '../../types/Department';
import Button from '../input/Button';
import Input from '../input/Input';
import Text from '../text/Text';

interface EditWorkerModalProps {
  isViewModal: boolean;
  onClose: () => void;
  data: DepartmentProps;
}

export default function EditWorkerModal({
  isViewModal,
  onClose,
  data,
}: EditWorkerModalProps) {
  // 폼 데이터
  const [departmentName, setDepartmentName] = useState<string>(
    data.departmentName,
  );

  // 팝업 시 실행
  useEffect(() => {
    if (isViewModal) {
    }
  }, [isViewModal]);

  // 부서명 수정 로직
  const [updateState, , _update] = useAxios(
    'patch',
    `/v1/gowork/department/${data.rowKey}`,
  );
  useEffect(() => {
    if (updateState === 'success') {
      onClose();
    }
  }, [updateState, onClose]);

  // 부서명 수정 버튼 클릭 이벤트
  const onPressUpdateButton = () => {
    _update({
      departmentName,
    });
  };

  const isDisabled = useMemo(() => {
    let disabled = true;
    if (data.departmentName !== departmentName && departmentName !== '') {
      disabled = false;
    }
    return disabled;
  }, [data.departmentName, departmentName]);

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <SafeAreaView style={{flex: 1}}>
        <ScrollView style={{flex: 1, padding: 20}}>
          {/* 부서명 */}
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
            title="부서명 수정하기"
            onPress={onPressUpdateButton}
            isLoading={updateState === 'loading'}
            isDisable={isDisabled}
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
