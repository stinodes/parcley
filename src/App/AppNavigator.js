// @flow
import {createMaterialTopTabNavigator} from 'react-navigation'
import {elevationStyleFromRaised, getColor} from 'nativesystem'
import {Dashboard} from './Dashboard'
import {Settings} from './Settings'
import {NewMatch} from './NewMatch'
import {createTabBarButton, createTabBarIcon, createTabBarLabel,} from './TabBar'
import {colors} from '../../colors'

const AppNavigator = createMaterialTopTabNavigator(
  {
    Dashboard: {
      screen: Dashboard,
      navigationOptions: {
        tabBarIcon: createTabBarIcon('list', 'ufoGreen'),
        // tabBarButtonComponent: createTabBarButton('ufoGreen'),
      }
    },
    Settings: {
      screen: Settings,
      navigationOptions: {
        tabBarIcon: createTabBarIcon('sliders', 'error'),
        // tabBarButtonComponent: createTabBarButton('error'),
      }
    },
    NewMatch: {
      screen: NewMatch,
      navigationOptions: {
        tabBarIcon: createTabBarIcon('plus', 'frenchSky'),
        // tabBarButtonComponent: createTabBarButton('frenchSky'),
      }
    }
  },
  {
    initialRouteName: 'Dashboard',
    order: ['Dashboard', 'NewMatch', 'Settings'],
    tabBarPosition: 'bottom',
    // lazy: false,
    tabBarOptions: {
      upperCaseLabel: true,
      showIcon: true,
      showLabel: false,
      style: {
        borderTopWidth: 0,
        backgroundColor: 'white',
        ...elevationStyleFromRaised(10)
      },
      indicatorStyle: {height: 0},
    }
  }
)

export {AppNavigator}
