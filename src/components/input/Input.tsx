/* eslint-disable react-native/no-inline-styles */
// 라이브러리
import React, {useState} from 'react';
import {View, TextInput, ViewProps, Platform} from 'react-native';
import {lime, grey} from '@ant-design/colors';
import Text from '../text/Text';

// 인터페이스
interface Props {
  style?: ViewProps;
  size?: number;
  label?: string;
  isEssential?: boolean;
  type: undefined | 'text' | 'password' | 'email' | 'tel' | 'number';
  value: string;
  onChange: (value: string) => void;
  placeholder?: undefined | string;
  autoFocus?: undefined | boolean;
  isReadOnly?: undefined | boolean;
  keyboardType?: undefined | 'default' | 'email-address' | 'number-pad';
  onSubmit?: () => void;
}

export default function TextField({
  style,
  size = 1,
  label,
  isEssential = false,
  type = 'text',
  value,
  onChange,
  placeholder,
  autoFocus,
  isReadOnly = false,
  onSubmit,
}: Props) {
  // keyboardType 설정
  let keyboardType: undefined | 'default' | 'email-address' | 'number-pad';
  if (type === 'email') {
    keyboardType = 'email-address';
  } else if (type === 'tel' || type === 'number') {
    keyboardType = 'number-pad';
  } else {
    keyboardType = 'default';
  }

  let [isFocus, setFocus] = useState(false);

  return (
    <View
      style={{
        ...style,
      }}>
      {label && (
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 6,
          }}>
          {isEssential && (
            <Text size={1.2} color={lime.primary}>
              *{' '}
            </Text>
          )}
          <Text>{label}</Text>
        </View>
      )}
      <View
        style={{
          borderWidth: 1,
          borderColor: isFocus ? lime[4] : grey[3],
          borderRadius: 4 * size,
          backgroundColor: isReadOnly ? grey[1] : 'white',
        }}>
        <TextInput
          style={{
            color: isReadOnly ? grey[6] : grey[8],
            paddingVertical: Platform.OS === 'ios' ? 12 * size : 6 * size,
            paddingHorizontal: Platform.OS === 'ios' ? 12 * size : 8 * size,
            fontSize: 14 * size,
            // lineHeight: 14 * size * 1.2,
          }}
          selectionColor={lime[3]}
          value={value}
          onChangeText={onChange}
          placeholder={placeholder}
          placeholderTextColor={grey[3]}
          autoFocus={autoFocus}
          editable={!isReadOnly}
          secureTextEntry={type === 'password'}
          keyboardType={keyboardType}
          autoCapitalize="none"
          returnKeyLabel="send"
          onSubmitEditing={() => {
            if (onSubmit) {
              onSubmit();
            }
          }}
          onFocus={() => {
            setFocus(true);
          }}
          onBlur={() => {
            setFocus(false);
          }}
        />
      </View>
    </View>
  );
}
