/* eslint-disable react-native/no-inline-styles */
import {
  View,
  SafeAreaView,
  VirtualizedList,
  RefreshControl,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Header from '../../components/global/Header';
import useAxios from '../../modules/useAxios';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTimes, faPen} from '@fortawesome/free-solid-svg-icons';

// 인터페이스
interface Props {
  navigation: any;
  route: any;
}

import DepartmentProps from '../../types/Department';
import AddWorkerModal from '../../components/department/AddModal';
import EditWorkerModal from '../../components/department/EditModal';
import Text from '../../components/text/Text';
import {grey, lime} from '@ant-design/colors';
import BottomModal from '../../components/modal/BottomModal';
import FloatingButton from '../../components/input/FloatingButton';

function DepartmentMngScreen(props: Props) {
  // 새로고침 여부
  const [isRefresh] = useState<boolean>(false);

  // 모달 보이기
  const [isViewAddModal, toggleAddModal] = useState<boolean>(false);
  const [isViewEditModal, toggleEditModal] = useState<boolean>(false);
  const [selectedData, setSelectedRowKey] = useState<DepartmentProps>({
    rowKey: 0,
    departmentName: '',
  });

  // 부서 조회
  const [selectState, selectRes, _select] = useAxios(
    'get',
    '/v1/gowork/department',
  );
  // 부서 조회
  const _search = useCallback(() => {
    _select();
  }, [_select]);
  useEffect(() => {
    if (selectState === 'done') {
      _search();
    }
  }, [_search, selectState]);

  // 선택된 로우키 변경 시 => 수정팝업
  useEffect(() => {
    if (selectedData.departmentName !== '') {
      toggleEditModal(true);
    }
  }, [selectedData]);

  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      {/* 헤더 */}
      <Header
        pageProps={props}
        title={'부서 관리'}
        backAction={() => props.navigation.pop()}
      />
      <View
        style={{
          paddingHorizontal: 20,
          height: 44,
          alignItems: 'flex-end',
          justifyContent: 'center',
          borderBottomWidth: 1,
          borderColor: grey[1],
        }}>
        <Text size={1} fw="bold" color={lime[5]}>
          {selectRes?.length}팀
        </Text>
      </View>
      <VirtualizedList
        data={selectRes}
        initialNumToRender={10}
        renderItem={({index, item}) => {
          return (
            <DepartmentCard
              key={index}
              data={item}
              reload={_search}
              setSelectedRowKey={setSelectedRowKey}
            />
          );
        }}
        keyExtractor={item => String(item.rowKey)}
        getItemCount={(data: DepartmentProps[]) => data?.length}
        getItem={(item: DepartmentProps[], index: number) => item[index]}
        refreshControl={
          <RefreshControl refreshing={isRefresh} onRefresh={_search} />
        }
      />

      <FloatingButton
        onPress={() => {
          toggleAddModal(true);
        }}
      />
      <BottomModal
        height={300}
        isView={isViewAddModal}
        onClose={() => {
          toggleAddModal(false);
        }}>
        <AddWorkerModal
          isViewModal={isViewAddModal}
          onClose={() => {
            toggleAddModal(false);
            _search();
          }}
        />
      </BottomModal>
      <BottomModal
        height={300}
        isView={isViewEditModal}
        onClose={() => {
          toggleEditModal(false);
        }}>
        <EditWorkerModal
          isViewModal={isViewEditModal}
          data={selectedData}
          onClose={() => {
            toggleEditModal(false);
            _search();
          }}
        />
      </BottomModal>
    </SafeAreaView>
  );
}

interface DepartmentCardProps {
  data: DepartmentProps;
  reload: () => void;
  setSelectedRowKey: any;
}

function DepartmentCard({
  data,
  reload,
  setSelectedRowKey,
}: DepartmentCardProps) {
  // 직원 삭제
  const [deleteState, , _delete] = useAxios(
    'delete',
    `/v1/gowork/department/${data.rowKey}`,
  );
  useEffect(() => {
    if (deleteState === 'success') {
      reload();
    }
  }, [deleteState, reload]);

  // 삭제 뻐튼 클릭 이벤트
  const onPressDeleteButton = () => {
    Alert.alert('알림', '정말 삭제 하시겠습니까?', [
      {text: '취소', style: 'cancel'},
      {
        text: '네',
        onPress: async () => {
          _delete();
        },
      },
    ]);
  };

  // 수정 뻐튼 클릭 이벤트
  const onPressEditButton = () => {
    setSelectedRowKey(data);
  };

  return (
    <View
      style={{
        borderBottomWidth: 1,
        borderBottomColor: grey[1],
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
      }}>
      <View style={{flex: 1}}>
        <Text size={1} fw="regular" color={grey[8]}>
          {data.departmentName}
        </Text>
      </View>
      <TouchableOpacity
        onPress={onPressEditButton}
        style={{
          width: 44,
          height: 44,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: lime[3],
        }}>
        <FontAwesomeIcon icon={faPen} size={16} color={grey[9]} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onPressDeleteButton}
        style={{
          width: 44,
          height: 44,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: grey[9],
        }}>
        <FontAwesomeIcon icon={faTimes} size={18} color={lime[3]} />
      </TouchableOpacity>
    </View>
  );
}

export default React.memo(DepartmentMngScreen);
