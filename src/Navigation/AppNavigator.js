// @flow
import * as React from 'react'
import {createSwitchNavigator} from 'react-navigation'
import {LoginScreen} from '../Onboarding'
import {Dashboard} from '../App'

const AppNavigator = createSwitchNavigator({
  Onboarding: {screen: LoginScreen},
  App: {screen: Dashboard}
}, {
  initialRouteName: 'Onboarding',
})

export {AppNavigator}
