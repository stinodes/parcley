// @flow
import * as React from 'react';
import { createSwitchNavigator } from 'react-navigation';
import { withSafeArea } from 'react-native-safe-area-view';
import { LoginScreen } from '../Onboarding';
import { AppNavigator } from '../App';

const MainNavigator = createSwitchNavigator(
  {
    Onboarding: { screen: LoginScreen },
    App: { screen: withSafeArea()(AppNavigator) },
  },
  {
    initialRouteName: 'Onboarding',
  },
);

export { MainNavigator };
