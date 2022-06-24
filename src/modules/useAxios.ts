import {useCallback, useReducer, useState} from 'react';
import axios from 'axios';
import apiUrl from '../modules/apiUrl';
import {useToast} from 'react-native-toast-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'LOADING':
      return {
        state: 'loading',
        data: state.data,
      };
    case 'SUCCESS':
      return {
        state: 'success',
        data: action.data,
      };
    case 'ERROR':
      return {
        state: 'error',
        data: action.data,
      };
    default:
      return {
        state: 'default',
        data: null,
      };
  }
};

const useAsync = (
  // Props
  method: 'post' | 'get' | 'delete' | 'put' | 'patch' | 'form',
  url: string,
  headers?: any,
  errorMessage?: boolean,
) => {
  // 토스 메시지
  const toast = useToast();

  // 메시지 표시 여부 : 기본 true
  if (errorMessage === undefined) {
    errorMessage = true;
  }

  // 이전 데이터
  const [prevData, setPrevData] = useState<any>(null);

  // reducer
  const [state, dispatch] = useReducer(reducer, {
    state: 'done',
    data: prevData,
  });

  // 데이터 조회
  const fetchData = useCallback(
    async (_params: any) => {
      dispatch({type: 'LOADING', data: prevData});

      try {
        let token = await AsyncStorage.getItem('access_token');

        // Axios 객체 생성
        const baseURL = apiUrl;
        const defaultClient = axios.create({
          baseURL,
          headers: headers
            ? headers
            : {
                Accept: 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
                Cache: 'no-cache',
                Authorization: token,
              },
          params: ['get', 'delete'].includes(method) ? _params : null,
        });

        // Time Out 설정
        defaultClient.defaults.timeout = 30000;

        // withCredentials 설정
        defaultClient.defaults.withCredentials = true;

        // axios 실행
        if (method !== 'form') {
          defaultClient[method](
            url,
            ['post', 'patch', 'put'].includes(method) ? _params : null,
          )
            .then(function (response) {
              setPrevData(() => response.data);
              dispatch({type: 'SUCCESS', data: response.data});
            })
            .catch(function (error) {
              if (error.response) {
                if (error.response.status === 500) {
                  toast.show(error?.response?.data?.message, {type: 'error'});
                } else if (error.response.status === 401) {
                } else if (error.response.status === 419) {
                } else {
                  toast.show(error?.response?.data?.message, {type: 'error'});
                }
                dispatch({type: 'ERROR', data: error.response?.data});
              } else {
                dispatch({
                  type: 'ERROR',
                  data: {
                    message:
                      '네트워크 연결이 불안정해요. \n잠시후 다시 시도해주세요.',
                  },
                });
              }
            });
        } else {
          defaultClient
            .post(url, _params ? _params : null, {
              headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                Cache: 'no-cache',
              },
            })
            .then(function (response) {
              setPrevData(() => response.data);
              dispatch({type: 'SUCCESS', data: response?.data});
            })
            .catch(function (error) {
              if (error.response) {
                if (error.response.status === 500) {
                  toast.show(error.response?.data?.message, {type: 'error'});
                } else {
                  toast.show(error.response?.data?.message, {type: 'error'});
                }
                dispatch({type: 'ERROR', data: error.response?.data});
              } else {
                toast.show(
                  '네트워크 연결이 불안정해요. \n잠시후 다시 시도해주세요.',
                  {type: 'error'},
                );
                dispatch({
                  type: 'ERROR',
                  data: {
                    message:
                      '네트워크 연결이 불안정해요. \n잠시후 다시 시도해주세요.',
                  },
                });
              }
            });
        }
      } catch (e: any) {
        dispatch({type: 'ERROR', data: e});
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [headers, method, toast, url],
  );

  return [state.state, state.data, fetchData];
};

export default useAsync;
