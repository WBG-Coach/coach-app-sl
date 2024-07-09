import React from 'react';
import {CoachProvider} from './providers/coach.provider';
import {NativeBaseProvider, VStack} from 'native-base';
import {NativeRouter, Routes} from 'react-router-native';
import RouterProvider from './routers';
import theme from './theme';
import 'moment/locale/ne';
import './i18n';
import i18n from './i18n';
import moment from 'moment';
import {useTranslation} from 'react-i18next';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import 'react-native-gesture-handler';

const App = () => {
  const currentLanguage = i18n.languages[0];
  moment.locale(currentLanguage);
  //only to rebuild moment when translation changes
  const {t} = useTranslation();

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NativeBaseProvider theme={theme}>
        <NativeRouter>
          <CoachProvider>
            <RouterProvider />
          </CoachProvider>
        </NativeRouter>
      </NativeBaseProvider>
    </GestureHandlerRootView>
  );
};

export default App;
