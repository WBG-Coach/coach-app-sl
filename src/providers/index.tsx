import React from 'react';
import {NativeBaseProvider} from 'native-base';
import theme from '../theme';
import UserContextProvider from './contexts/UserContext';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetProvider} from './contexts/BottomSheetContext';
import {ClickOutsideProvider} from 'react-native-click-outside';
import CompetenceContextProvider from './contexts/CompetencesContext';

type Props = {
  children: React.ReactNode;
};

const RootProvider: React.FC<Props> = ({children}) => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NativeBaseProvider theme={theme}>
        <ClickOutsideProvider>
          <BottomSheetProvider>
            <UserContextProvider>
              <CompetenceContextProvider>{children}</CompetenceContextProvider>
            </UserContextProvider>
          </BottomSheetProvider>
        </ClickOutsideProvider>
      </NativeBaseProvider>
    </GestureHandlerRootView>
  );
};

export default RootProvider;
