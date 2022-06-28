/* eslint-disable react-native/no-inline-styles */
import {
  View,
  SafeAreaView,
  VirtualizedList,
  RefreshControl,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Header from '../../components/global/Header';
import useAxios from '../../modules/useAxios';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTimes, faPen} from '@fortawesome/free-solid-svg-icons';
import FloatingButton from '../../components/input/FloatingButton';
import BottomModal from '../../components/modal/BottomModal';
import Text from '../../components/text/Text';
import {blue, grey, lime, red} from '@ant-design/colors';

// 인터페이스
interface Props {
  navigation: any;
  route: any;
}

import WorkerProps from '../../types/Worker';
import AddWorkerModal from '../../components/worker/AddModal';
import EditWorkerModal from '../../components/worker/EditModal';

// 화면 사이즈
const SCREEN_HEIGHT = Dimensions.get('screen').height;

export default function WorkerMngScreen(props: Props) {
  // 새로고침 여부
  const [isRefresh] = useState<boolean>(false);
  // 모달 보이기
  const [isViewAddModal, toggleAddModal] = useState<boolean>(false);
  const [isViewEditModal, toggleEditModal] = useState<boolean>(false);
  const [selectedWorkerKey, setSelectedWorkerKey] = useState<number>(0);
  // 직원 리스트 조회
  const [selectState, selectRes, _select] = useAxios(
    'get',
    '/v1/gowork/worker',
  );
  // 직원 리스트 조회
  const _search = useCallback(() => {
    _select();
  }, [_select]);
  useEffect(() => {
    if (selectState === 'done') {
      _search();
    }
  }, [_search, selectState]);

  // 직원키 변겨 시 모달 팝업
  useEffect(() => {
    if (selectedWorkerKey !== 0) {
      toggleEditModal(true);
    }
  }, [selectedWorkerKey]);

  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      {/* 헤더 */}
      <Header
        pageProps={props}
        title={'직원 관리'}
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
          {selectRes?.length}명
        </Text>
      </View>
      <VirtualizedList
        data={selectRes}
        initialNumToRender={20}
        renderItem={({index, item}) => {
          return (
            <WorkerCard
              key={index}
              data={item}
              reload={_search}
              setSelectedWorkerKey={setSelectedWorkerKey}
            />
          );
        }}
        keyExtractor={item => String(item.workerKey)}
        getItemCount={(data: WorkerProps[]) => data?.length}
        getItem={(item: WorkerProps[], index: number) => item[index]}
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
        height={SCREEN_HEIGHT - 150}
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
        height={SCREEN_HEIGHT - 150}
        isView={isViewEditModal}
        onClose={() => {
          toggleEditModal(false);
        }}>
        <EditWorkerModal
          isViewModal={isViewEditModal}
          workerKey={selectedWorkerKey}
          onClose={() => {
            toggleEditModal(false);
            _search();
          }}
        />
      </BottomModal>
    </SafeAreaView>
  );
}

interface WorkerCardProps {
  data: WorkerProps;
  reload: () => void;
  setSelectedWorkerKey: any;
}

function WorkerCard({data, reload, setSelectedWorkerKey}: WorkerCardProps) {
  // 직원 삭제
  const [deleteState, , _delete] = useAxios(
    'delete',
    `/v1/gowork/worker/${data.workerKey}`,
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
    setSelectedWorkerKey(data.workerKey);
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
      <View style={{flex: 1}}>
        <Text size={1} fw="regular" color={grey[8]}>
          {data.nickname}({data.name})
          <View
            style={{
              height: 22,
              alignItems: 'center',
              justifyContent: 'flex-end',
              marginLeft: 4,
            }}>
            <Text
              size={0.8}
              fw="regular"
              color={
                data.level === '00'
                  ? lime[4]
                  : data.level === '01'
                  ? blue[3]
                  : red[3]
              }>
              {data.level === '00'
                ? '팀원'
                : data.level === '01'
                ? '팀장'
                : '대표'}
            </Text>
          </View>
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
