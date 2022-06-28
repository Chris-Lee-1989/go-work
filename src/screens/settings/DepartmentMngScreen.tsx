/* eslint-disable react-native/no-inline-styles */
import {
  View,
  SafeAreaView,
  VirtualizedList,
  RefreshControl,
  TouchableOpacity,
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
import Text from '../../components/text/Text';
import {grey, lime} from '@ant-design/colors';

export default function DepartmentMngScreen(props: Props) {
  // 새로고침 여부
  const [isRefresh] = useState<boolean>(false);
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
          return <DepartmentCard key={index} data={item} />;
        }}
        keyExtractor={item => String(item.rowKey)}
        getItemCount={(data: DepartmentProps[]) => data?.length}
        getItem={(item: DepartmentProps[], index: number) => item[index]}
        refreshControl={
          <RefreshControl refreshing={isRefresh} onRefresh={_search} />
        }
      />
    </SafeAreaView>
  );
}

interface DepartmentCardProps {
  data: DepartmentProps;
}

function DepartmentCard({data}: DepartmentCardProps) {
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
