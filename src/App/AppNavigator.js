// @flow
import {createBottomTabNavigator} from 'react-navigation'
import {elevationStyleFromRaised} from 'nativesystem'
import {Dashboard} from './Dashboard'
import {Settings} from './Settings'
import {NewMatch} from './NewMatch'

const AppNavigator = createBottomTabNavigator(
  {
    //$FlowFixMe
    Dashboard,
    //$FlowFixMe
    Settings,
    //$FlowFixMe
    NewMatch,
  },
  {
    initialRouteName: 'Dashboard',
    tabBarOptions: {
      showLabel: false,
      style: {
        borderTopWidth: 0,
        backgroundColor: 'white',
        height: 64,
        ...elevationStyleFromRaised(10)
      }
    }
  }
)

export {AppNavigator}
