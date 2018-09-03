// @flow
import { createMaterialTopTabNavigator } from 'react-navigation';
import { elevationStyleFromRaised } from 'nativesystem';
import { DashboardNavigator } from './Dashboard';
import { Profile } from './Profile';
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
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarIcon: createTabBarIcon('user', 'error'),
        // tabBarButtonComponent: createTabBarButton('error'),
      },
    },
    NewOrder: {
      screen: NewOrder,
      navigationOptions: {
        tabBarIcon: createTabBarIcon('plus', 'gunMetal'),
        // tabBarButtonComponent: createTabBarButton('frenchSky'),
      },
    },
  },
  {
    initialRouteName: 'Dashboard',
    order: ['Dashboard', 'NewOrder', 'Profile'],
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
