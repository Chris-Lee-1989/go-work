import {atom} from 'recoil';

interface Worker {
  isLogin: boolean;
  workerKey: number | undefined;
  name: string | undefined;
  nickname: string | undefined;
  level: string | undefined;
  email: string | undefined;
  isWork: boolean;
  pushToken: string | undefined;
}

// 토큰 State
export default atom<Worker>({
  key: 'userState',
  default: {
    isLogin: false,
    workerKey: undefined,
    name: undefined,
    nickname: undefined,
    level: undefined,
    email: undefined,
    isWork: false,
    pushToken: undefined,
  },
});
