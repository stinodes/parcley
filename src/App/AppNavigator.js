// @flow
import { createMaterialTopTabNavigator } from 'react-navigation';
import { elevationStyleFromRaised } from 'nativesystem';
import { DashboardNavigator } from './Dashboard';
import { Settings } from './Settings';
import { NewOrder } from './NewOrder';
import { createTabBarIcon } from './TabBar';

const AppNavigator = createMaterialTopTabNavigator(
  {
    Dashboard: {
      screen: DashboardNavigator,
      navigationOptions: {
        tabBarIcon: createTabBarIcon('list', 'ufoGreen'),
        // tabBarButtonComponent: createTabBarButton('ufoGreen'),
      },
    },
    Settings: {
      screen: Settings,
      navigationOptions: {
        tabBarIcon: createTabBarIcon('sliders', 'error'),
        // tabBarButtonComponent: createTabBarButton('error'),
      },
    },
    NewOrder: {
      screen: NewOrder,
      navigationOptions: {
        tabBarIcon: createTabBarIcon('plus', 'frenchSky'),
        // tabBarButtonComponent: createTabBarButton('frenchSky'),
      },
    },
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
        ...elevationStyleFromRaised(10),
      },
      indicatorStyle: { height: 0 },
    },
  },
);

export { AppNavigator };
