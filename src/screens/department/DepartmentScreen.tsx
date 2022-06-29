/* eslint-disable react-native/no-inline-styles */
import {
  View,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import Header from '../../components/global/Header';
import {grey, lime} from '@ant-design/colors';
import useAxios from '../../modules/useAxios';
import Text from '../../components/text/Text';

// 인터페이스
interface Props {
  navigation: any;
  route: any;
}

export default function Home(props: Props) {
  // 새로고침 여부
  const [isRefresh] = useState<boolean>(false);
  // 직원 리스트 조회
  const [getState, getRes, _gets] = useAxios('get', '/v1/gowork/worker');

  // 직원 리스트 조회 후 처리
  useEffect(() => {
    if (getState === 'done') {
      _gets();
    }
  }, [_gets, getState]);

  // 부서키
  const groupKey = useMemo(() => {
    let keys: any[] = [];
    let prev: any = null;
    if (getRes) {
      getRes.forEach((row: any) => {
        if (row.departmentKey !== prev) {
          keys.push(row.departmentKey);
          prev = row.departmentKey;
        }
      });
    }
    return keys;
  }, [getRes]);

  // 부서키 별 그룹화
  const groups = useMemo(() => {
    let group: any[] = [];
    if (getRes) {
      for (let i = 0; groupKey.length > i; i++) {
        let arr = getRes.filter((row: any) => {
          return row.departmentKey === groupKey[i];
        });
        group.push(arr);
      }
    }
    return group;
  }, [getRes, groupKey]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      {/* 헤더 */}
      <Header pageProps={props} title={'부서'} />
      {getState === 'success' ? (
        <ScrollView
          style={{flex: 1, backgroundColor: grey[0], padding: 20}}
          refreshControl={
            <RefreshControl refreshing={isRefresh} onRefresh={_gets} />
          }>
          {groups.map((group: any, idx1: number) => {
            const departmentName = group[0].departmentName;
            return (
              <View style={{marginBottom: 20}} key={idx1}>
                <View style={{marginBottom: 8}}>
                  <Text fw="bold" color={grey[8]} size={0.9}>
                    {departmentName}
                  </Text>
                </View>
                <View
                  style={{
                    padding: 10,
                    backgroundColor: 'white',
                    borderRadius: 4,
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-evenly',
                  }}>
                  {group.map((worker: any, idx2: number) => {
                    let isWork = worker.isWork;
                    return (
                      <View
                        key={`${idx1}-${idx2}`}
                        style={{
                          margin: 10,
                          width: 60,
                          height: 60,
                          borderRadius: 100,
                          borderWidth: 2,
                          borderColor: isWork === 'Y' ? lime[3] : grey[3],
                          backgroundColor: isWork === 'Y' ? grey[9] : 'white',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Text
                          size={0.5}
                          fw="regular"
                          color={isWork === 'Y' ? lime[3] : grey[3]}>
                          {worker.level === '00'
                            ? '팀원'
                            : worker.level === '01'
                            ? '팀장'
                            : '대표'}
                        </Text>
                        <Text
                          size={0.9}
                          fw="bold"
                          color={isWork === 'Y' ? lime[3] : grey[3]}>
                          {worker.nickname}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              </View>
            );
          })}
        </ScrollView>
      ) : (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </SafeAreaView>
  );
}
