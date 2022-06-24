/* eslint-disable react-native/no-inline-styles */
import {Dimensions, Pressable, SafeAreaView, View} from 'react-native';
import React, {useMemo, useState} from 'react';
import Header from '../../components/global/Header';
import PagerView from 'react-native-pager-view';
import Text from '../../components/text/Text';
import {grey, lime} from '@ant-design/colors';

// 페이지
import WorkPage1 from '../../components/work/WorkPage1';
import WorkPage2 from '../../components/work/WorkPage2';
import WorkPage3 from '../../components/work/WorkPage3';

// 인터페이스
interface Props {
  navigation: any;
  route: any;
}

export default function WorkDashboardScreen(props: Props) {
  // 스크린 너비
  const SCREEN_WIDTH = Dimensions.get('screen').width;
  // 페이저뷰 REF
  const [pagerViewRef, setRef] = useState<any>(null);
  // 페이지 이동
  // const _setPage = useMemo(() => {
  //   return pagerViewRef ? pagerViewRef?.setPage : () => {};
  // }, [pagerViewRef]);
  // 애니메이션 없이 페이지 이동
  const _setPageWithoutAni = useMemo(() => {
    return pagerViewRef ? pagerViewRef?.setPageWithoutAnimation : () => {};
  }, [pagerViewRef]);
  // 페이지 현재 위치
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [currentPos, setCurrentPos] = useState<number>(0);
  // 페이지 타이틀
  const pageTitles = ['주', '월', '년'];
  const posMark = useMemo(() => {
    let pos = 0;
    pos += Number(currentPos.toFixed(2));
    pos += Number(currentPage);
    pos = (SCREEN_WIDTH - 40) * (pos / pageTitles.length) + 20;
    return pos;
  }, [currentPos, currentPage, SCREEN_WIDTH, pageTitles.length]);

  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      {/* 헤더 */}
      <Header
        pageProps={props}
        title={'출퇴근'}
        backAction={() => props.navigation.pop()}
      />
      {/* 메뉴 */}
      <View style={{borderBottomWidth: 1, borderColor: grey[1]}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            paddingHorizontal: 20,
          }}>
          {pageTitles.map((title: string, idx: number) => {
            const isSelected = idx === currentPage;
            return (
              <Pressable
                key={idx}
                onPress={() => {
                  _setPageWithoutAni(idx);
                }}
                style={{
                  flex: 1,
                  height: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'white',
                }}>
                <Text
                  color={isSelected ? lime[5] : grey[3]}
                  fw={isSelected ? 'bold' : 'regular'}>
                  {title}
                </Text>
              </Pressable>
            );
          })}
        </View>
        <View style={{height: 2, backgroundColor: 'white'}}>
          <View
            style={{
              position: 'absolute',
              height: 2,
              backgroundColor: lime[4],
              width: (SCREEN_WIDTH - 40) / pageTitles.length,
              left: posMark,
            }}
          />
        </View>
      </View>
      {/* 뷰 */}
      <PagerView
        ref={(ref: any) => setRef(ref)}
        scrollEnabled={true}
        onPageScroll={(event: any) => {
          setCurrentPos(event.nativeEvent.offset);
          setCurrentPage(event.nativeEvent.position);
        }}
        onPageSelected={(event: any) => {
          setCurrentPage(event.nativeEvent.position);
        }}
        // showPageIndicator={true} // Only iOS
        style={{
          flex: 1,
        }}
        initialPage={0}>
        <WorkPage1 isSelected={currentPage === 0} />
        <WorkPage2 isSelected={currentPage === 1} />
        <WorkPage3 isSelected={currentPage === 2} />
      </PagerView>
    </SafeAreaView>
  );
}
