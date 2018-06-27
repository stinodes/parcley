// @flow
import * as React from 'react'
import {createSwitchNavigator} from 'react-navigation'

const AppNavigator = createSwitchNavigator({
  Onboarding: {screen: () => null},
  App: {screen: () => null}
})

export {AppNavigator}
