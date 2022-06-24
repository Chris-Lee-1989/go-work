import {View, Text} from 'react-native';
import React, {useEffect} from 'react';

interface Props {
  isSelected: boolean;
}

export default function WorkPage2(props: Props) {
  // console.log(props);
  useEffect(() => {
    // console.log('mount page 2');
  }, []);
  return (
    <View>
      <Text>workPage2</Text>
    </View>
  );
}
