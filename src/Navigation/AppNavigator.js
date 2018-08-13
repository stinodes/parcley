// @flow
import * as React from 'react';
import { Platform } from 'react-native';
import { createSwitchNavigator } from 'react-navigation';
import { withSafeArea } from 'react-native-safe-area-view';
import { LoginScreen } from '../Onboarding';
import { AppNavigator } from '../App';

const MainNavigator = createSwitchNavigator({
  Onboarding: LoginScreen,
  App: AppNavigator,
});

export { MainNavigator };
