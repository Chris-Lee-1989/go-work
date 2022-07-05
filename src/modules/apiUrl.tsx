import {Platform} from 'react-native';

export default (() => {
  if (Platform.OS === 'android') {
    // return 'http://192.168.219.104:8080';
    // return 'http://10.0.2.2:8080';
    return 'https://wms-api.flowerfarm.co.kr';
  } else {
    // return 'http://192.168.219.104:8080';
    return 'https://wms-api.flowerfarm.co.kr';
  }
})();
