// @flow
import {createMaterialTopTabNavigator} from 'react-navigation'
import {elevationStyleFromRaised, getColor} from 'nativesystem'
import {Dashboard} from './Dashboard'
import {Settings} from './Settings'
import {NewOrder} from './NewOrder'
import {OrderDetail} from './OrderDetail'
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
    NewOrder: {
      screen: NewOrder,
      navigationOptions: {
        tabBarIcon: createTabBarIcon('plus', 'frenchSky'),
        // tabBarButtonComponent: createTabBarButton('frenchSky'),
      }
    },
    // Detail: {
    //   screen: OrderDetail,
    // }
  },
  {
    initialRouteName: 'Dashboard',
    order: ['Dashboard', 'NewOrder', 'Settings'],
    tabBarPosition: 'bottom',
    // lazy: false,
    tabBarOptions: {
      upperCaseLabel: true,
      showIcon: true,
      showLabel: false,
      style: {
        paddingVertical: 8,
        borderTopWidth: 0,
        backgroundColor: 'white',
        ...elevationStyleFromRaised(10)
      },
      indicatorStyle: {height: 0},
    }
  }
)

export {AppNavigator}
