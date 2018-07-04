// @flow
import {SwitchNavigator, DrawerNavigator, StackNavigator, TabNavigator} from 'react-navigation'
import type {Ref} from 'react'

type Navigator = StackNavigator|SwitchNavigator|DrawerNavigator|TabNavigator
type API = {
  ref: Ref<Navigator>,
  dispatch: $PropertyType<Navigator, 'dispatch'>,
}
const createNavigationService = (): API => {
  let navigator: Navigator
  let bufferedActions = []
  
  const setNavigator = (_navigator: Navigator) => {
    let sendBufferedActions = !navigator
    navigator = _navigator
    if (sendBufferedActions)
      bufferedActions.map(args => navigator.dispatch(...args))
  }
  
  return {
    ref: setNavigator,
    dispatch: (...args) => {
      if (navigator)
        navigator.dispatch(...args)
      else
        bufferedActions = [...bufferedActions, args]
    }
  }
}

export const NavigationService = createNavigationService()
