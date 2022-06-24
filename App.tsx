/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {RecoilRoot} from 'recoil';
import IndexRouter from './src/indexRouter';
import Spinner from './src/components/global/Spinner';
import {ToastProvider} from 'react-native-toast-notifications';
import {Platform, Text, View, StatusBar} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faExclamationCircle,
  faExclamationTriangle,
  faCheck,
  faEnvelopeOpenText,
} from '@fortawesome/free-solid-svg-icons';
import {grey, blue, red, orange} from '@ant-design/colors';
import messaging from '@react-native-firebase/messaging';

const App = () => {
  useEffect(() => {
    if (Platform.OS === 'ios') {
      requestUserPermission();
    }
  }, []);

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      // console.log('Authorization status ' + Platform.OS + ' : ', authStatus);
    }
  }

  return (
    <RecoilRoot>
      <StatusBar animated={true} barStyle="dark-content" />
      <Spinner />
      <NavigationContainer>
        <ToastProvider
          placement="top"
          duration={3000}
          animationType="slide-in"
          animationDuration={200}
          swipeEnabled={true}
          renderToast={toastOptions => {
            return (
              <>
                <View
                  style={[
                    {
                      backgroundColor: 'white',
                      flexDirection: 'row',
                      transform: [
                        {translateY: Platform.OS === 'android' ? 20 : 50},
                      ],
                      borderRadius: 12,
                      padding: 16,
                      borderWidth: 1,
                      borderColor: grey[0],
                    },
                    Platform.OS === 'android'
                      ? {}
                      : {
                          shadowColor: grey[3],
                          shadowOpacity: 0.2,
                          shadowOffset: {width: 2, height: 8},
                          shadowRadius: 8,
                        },
                  ]}>
                  <View style={{paddingTop: 2}}>
                    {toastOptions.type === 'normal' ? (
                      <FontAwesomeIcon
                        icon={faEnvelopeOpenText}
                        color={grey[5]}
                        size={16}
                      />
                    ) : toastOptions.type === 'success' ? (
                      <FontAwesomeIcon
                        icon={faCheck}
                        color={blue.primary}
                        size={16}
                      />
                    ) : toastOptions.type === 'warning' ? (
                      <FontAwesomeIcon
                        icon={faExclamationTriangle}
                        color={orange.primary}
                        size={16}
                      />
                    ) : toastOptions.type === 'error' ? (
                      <FontAwesomeIcon
                        icon={faExclamationCircle}
                        color={red.primary}
                        size={16}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faEnvelopeOpenText}
                        color={grey[5]}
                        size={16}
                      />
                    )}
                  </View>
                  <View style={{marginLeft: 12, marginRight: 12}}>
                    <Text
                      style={{
                        fontSize: 16,
                        lineHeight: 20,
                        fontWeight: '400',
                        color: grey[5],
                      }}>
                      {toastOptions.message}
                    </Text>
                  </View>
                </View>
              </>
            );
          }}>
          <IndexRouter />
        </ToastProvider>
      </NavigationContainer>
    </RecoilRoot>
  );
};
export default App;
