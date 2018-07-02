// @flow
import * as React from 'react'
import {createSwitchNavigator} from 'react-navigation'
import {LoginScreen} from '../Onboarding'

const AppNavigator = createSwitchNavigator({
  Onboarding: {screen: LoginScreen},
  App: {screen: () => null}
}, {
  initialRoute: 'Onboarding',
})

export {AppNavigator}
