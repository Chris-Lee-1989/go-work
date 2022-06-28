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

interface EditWorkerModalProps {
  isViewModal: boolean;
  onClose: () => void;
  workerKey: number;
}

export default function EditWorkerModal({
  isViewModal,
  onClose,
  workerKey,
}: EditWorkerModalProps) {
  // 폼 데이터
  const [name, setName] = useState<string>('');
  const [nickname, setNickName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [tel, setTel] = useState<string>('');
  const [department, setDepartment] = useState<number | undefined>(undefined);
  const [level, setLevel] = useState<string>('');

  // 팝업 시 실행
  useEffect(() => {
    if (isViewModal) {
    }
  }, [isViewModal]);

  // 직원 조회
  const [workerState, workerRes, _worker] = useAxios(
    'get',
    `/v1/gowork/worker/${workerKey}`,
  );
  // 부서 조회
  const [selectState, selectRes, _select] = useAxios(
    'get',
    '/v1/gowork/department',
  );

  // 데이터 조회 완료 시 데이터 초기화
  const initData = useCallback(() => {
    setName(workerRes.name);
    setNickName(workerRes.nickname);
    setEmail(workerRes.email);
    setTel(workerRes.tel);
    setDepartment(workerRes.departmentKey);
    setLevel(workerRes.level);
  }, [workerRes]);

  const _search = useCallback(() => {
    _select();
    _worker();
  }, [_select, _worker]);
  useEffect(() => {
    if (selectState === 'done') {
      _search();
    }
    if (workerState === 'success') {
      initData();
    }
  }, [_search, selectState, workerState, initData]);

  // 직급 배열
  const levelArr = [
    {key: '팀원', value: '00'},
    {key: '팀장', value: '01'},
    {key: '대표', value: '10'},
  ];

  // 직원 추가 버튼 활성화
  const isDisabled = useMemo(() => {
    let disable = true;
    if (
      workerRes?.name !== name ||
      workerRes?.nickname !== nickname ||
      workerRes?.email !== email ||
      workerRes?.tel !== tel ||
      workerRes?.departmentKey !== department ||
      workerRes?.level !== level
    ) {
      disable = false;
    }
    return disable;
  }, [
    department,
    email,
    level,
    name,
    nickname,
    tel,
    workerRes?.departmentKey,
    workerRes?.email,
    workerRes?.level,
    workerRes?.name,
    workerRes?.nickname,
    workerRes?.tel,
  ]);

  // 직원 수정 로직
  const [updateState, , _update] = useAxios('patch', '/v1/gowork/worker');
  useEffect(() => {
    if (updateState === 'success') {
      onClose();
    }
  }, [updateState, onClose]);

  // 직원 수정 버튼 클릭 이벤트
  const onPressUpdateButton = () => {
    _update({
      workerKey,
      name,
      nickname,
      tel,
      email,
      department,
      level,
    });
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <SafeAreaView style={{flex: 1}}>
        {workerState === 'success' && (
          <ScrollView style={{flex: 1, padding: 20}}>
            {/* 이름 */}
            <Text
              style={{marginBottom: 8}}
              size={0.8}
              fw="regular"
              color={grey[9]}>
              이름
            </Text>
            <Input
              type="text"
              value={name}
              onChange={(value: string) => setName(value)}
            />
            {/* 영어이름 */}
            <Text
              style={{marginBottom: 8, marginTop: 20}}
              size={0.8}
              fw="regular"
              color={grey[9]}>
              영어이름
            </Text>
            <Input
              type="text"
              value={nickname}
              onChange={(value: string) => setNickName(value)}
            />
            {/* 이메일 */}
            <Text
              style={{marginBottom: 8, marginTop: 20}}
              size={0.8}
              fw="regular"
              color={grey[9]}>
              이메일
            </Text>
            <Input
              type="email"
              value={email}
              onChange={(value: string) => setEmail(value)}
            />
            {/* 전화번호 */}
            <Text
              style={{marginBottom: 8, marginTop: 20}}
              size={0.8}
              fw="regular"
              color={grey[9]}>
              전화번호
            </Text>
            <Input
              type="tel"
              value={tel}
              onChange={(value: string) => setTel(value)}
            />
            {/* 부서 */}
            <Text
              style={{marginBottom: 8, marginTop: 20}}
              size={0.8}
              fw="regular"
              color={grey[9]}>
              부서
            </Text>
            <View
              style={{
                flexDirection: 'row',
                borderWidth: 1,
                borderColor: grey[3],
                borderRadius: 4,
                backgroundColor: 'white',
              }}>
              {selectRes?.map((depart: DepartmentProps, idx: number) => {
                return (
                  <TouchableOpacity
                    onPress={() => setDepartment(depart.rowKey)}
                    key={idx}
                    style={[
                      {
                        flex: 1,
                        borderRightWidth: selectRes?.length - 1 === idx ? 0 : 1,
                        borderColor: grey[3],
                        height: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                      },
                    ]}>
                    <Text
                      align="center"
                      size={0.7}
                      color={department === depart.rowKey ? lime[4] : grey[6]}
                      fw={department === depart.rowKey ? 'bold' : 'regular'}>
                      {depart.departmentName}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            {/* 직위 */}
            <Text
              style={{marginBottom: 8, marginTop: 20}}
              size={0.8}
              fw="regular"
              color={grey[9]}>
              직위
            </Text>
            <View
              style={{
                flexDirection: 'row',
                borderWidth: 1,
                borderColor: grey[3],
                borderRadius: 4,
                backgroundColor: 'white',
              }}>
              {levelArr.map((row: any, idx: number) => {
                return (
                  <TouchableOpacity
                    onPress={() => setLevel(row.value)}
                    key={idx}
                    style={[
                      {
                        flex: 1,
                        borderRightWidth: levelArr.length - 1 === idx ? 0 : 1,
                        borderColor: grey[3],
                        height: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                      },
                    ]}>
                    <Text
                      align="center"
                      size={0.7}
                      color={level === row.value ? lime[4] : grey[6]}
                      fw={level === row.value ? 'bold' : 'regular'}>
                      {row.key}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        )}
        <View style={{padding: 20}}>
          <Button
            title="직원정보 수정하기"
            onPress={onPressUpdateButton}
            isDisable={isDisabled}
            isLoading={updateState === 'loading'}
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
