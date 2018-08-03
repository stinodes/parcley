// @flow
import { createStackNavigator } from 'react-navigation';
import { OrderDetail } from './OrderDetail';
import { DashboardList } from './DashboardList';

const DashboardNavigator = createStackNavigator(
  {
    List: {
      screen: DashboardList,
    },
    Detail: {
      screen: OrderDetail,
    },
  },
  {
    initialRouteName: 'List',
    navigationOptions: {
      header: null,
    },
  },
);

export { DashboardNavigator };
