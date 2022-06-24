import {View, Text} from 'react-native';
import React, {useEffect} from 'react';

interface Props {
  isSelected: boolean;
}

export default function WorkPage3(props: Props) {
  // console.log(props);
  useEffect(() => {
    // console.log('mount page 3');
  }, []);
  return (
    <View>
      <Text>workPage3</Text>
    </View>
  );
}
