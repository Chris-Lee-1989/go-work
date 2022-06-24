import {Dimensions} from 'react-native';
// const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export const PxToDp = (px: number) => {
  return (screenWidth * px) / 320;
};

export const dateFormat = (date: string, divStr?: string) => {
  date = String(date);
  if (date !== undefined) {
    divStr = divStr ? divStr : '/';
    let y = date.substring(0, 4);
    let m = date.substring(4, 6);
    let d = date.substring(6, 8);
    return y + divStr + m + divStr + d;
  } else {
    return date;
  }
};

export const dateTimeFormat = (date: string, divStr?: string) => {
  if (date !== undefined) {
    divStr = divStr ? divStr : '/';
    let y = date.substring(0, 4);
    let m = date.substring(4, 6);
    let d = date.substring(6, 8);

    return (
      y +
      divStr +
      m +
      divStr +
      d +
      ' ' +
      date.substring(8, 10) +
      ':' +
      date.substring(10, 12) +
      ':' +
      date.substring(12, 14)
    );
  } else {
    return date;
  }
};

export const cardFormat = (date: string) => {
  if (date !== undefined) {
    let a = date.substring(0, 4);
    let b = date.substring(4, 8);
    let c = date.substring(8, 12);
    let d = date.substring(12, 16);
    return a + '-' + b + '-' + c + '-' + d;
  } else {
    return date;
  }
};

export const telFormat = (tel: string) => {
  if (tel !== undefined) {
    if (tel.length === 9) {
      return `${tel.substring(0, 2)}-${tel.substring(2, 5)}-${tel.substring(
        5,
        9,
      )}`;
    } else if (tel.length === 10) {
      return `${tel.substring(0, 3)}-${tel.substring(3, 6)}-${tel.substring(
        6,
        10,
      )}`;
    } else if (tel.length === 11) {
      return `${tel.substring(0, 3)}-${tel.substring(3, 7)}-${tel.substring(
        7,
        11,
      )}`;
    } else if (tel.length === 12) {
      return `${tel.substring(0, 4)}-${tel.substring(4, 8)}-${tel.substring(
        8,
        12,
      )}`;
    } else {
      return tel;
    }
  } else {
    return tel;
  }
};

export const bizNumFormat = (num: string) => {
  if (num !== undefined && num.length === 10) {
    let part1 = num.substring(0, 3);
    let part2 = num.substring(3, 5);
    let part3 = num.substring(5, 10);
    return part1 + '-' + part2 + '-' + part3;
  } else {
    return num;
  }
};

// LPAD
export const lpad = (str: string, padLen: number, padStr: string) => {
  if (padStr.length > padLen) {
    return str;
  }
  str += ''; // 문자로
  padStr += ''; // 문자로
  while (str.length < padLen) str = padStr + str;
  str = str.length >= padLen ? str.substring(0, padLen) : str;
  return str;
};

export const comma = (num: string) => {
  var len, point, str;
  num += '';
  point = num.length % 3;
  len = num.length;
  str = num.substring(0, point);
  while (point < len) {
    if (str !== '') str += ',';
    str += num.substring(point, point + 3);
    point += 3;
  }
  return str;
};

export const getByte = (text: string) => {
  var bts, ii, chr; // 한글 3byte
  for (
    bts = ii = 0;
    (chr = text.charCodeAt(ii++));
    bts += chr >> 11 ? 3 : chr >> 7 ? 2 : 1
  );
  return bts;
};

export const getNumber = (str: string) => {
  if (str) {
    return str.replace(/[^0-9]/g, '');
  } else {
    return str;
  }
};

// 카드 색상 조회
export const getCardColor = (cardName: string) => {
  // 카드사 색상 지정
  let bgColor = '#999';
  let cardColor = '#FFF';
  if (!cardName) {
    return {bgColor, cardColor};
  }
  if (cardName.indexOf('롯데') > -1) {
    bgColor = '#DC0012';
    cardColor = 'white';
  }
  if (cardName.indexOf('KB') > -1) {
    bgColor = '#F7BF00';
    cardColor = 'white';
  }
  if (cardName.indexOf('NH') > -1) {
    bgColor = '#F2C12E';
    cardColor = '#0058A5';
  }
  if (cardName.indexOf('카카오') > -1) {
    bgColor = '#F7D901';
    cardColor = '#361F20';
  }
  if (cardName.indexOf('신한') > -1) {
    bgColor = '#0066AE';
    cardColor = '#E2C79F';
  }
  if (cardName.indexOf('삼성') > -1) {
    bgColor = '#0F4295';
    cardColor = 'white';
  }
  if (cardName.indexOf('대구') > -1) {
    bgColor = '#006ABC';
    cardColor = '#006ABC';
  }
  if (cardName.indexOf('비씨') > -1) {
    bgColor = '#F12A47';
    cardColor = 'white';
  }
  if (cardName.indexOf('우리') > -1) {
    bgColor = '#0B70BC';
    cardColor = '#87CBEC';
  }
  if (cardName.indexOf('IBK') > -1) {
    bgColor = '#87CBEC';
    cardColor = '#E74F1E';
  }
  if (cardName.indexOf('현대') > -1) {
    bgColor = '#042651';
    cardColor = 'white';
  }
  if (cardName.indexOf('신협') > -1) {
    bgColor = '#1050EA';
    cardColor = '#9B873F';
  }
  if (cardName.indexOf('하나') > -1) {
    bgColor = '#008581';
    cardColor = '#CA002D';
  }

  return {bgColor, cardColor};
};
