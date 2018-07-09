// @flow
import * as React from 'react'
import {createSwitchNavigator} from 'react-navigation'
import {LoginScreen} from '../Onboarding'
import {AppNavigator} from '../App'

const MainNavigator = createSwitchNavigator({
  Onboarding: {screen: LoginScreen},
  App: {screen: AppNavigator}
}, {
  initialRouteName: 'Onboarding',
})

export {MainNavigator}
