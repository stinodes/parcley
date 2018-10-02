// @flow
import * as React from "react";
import {
  backgroundColor,
  Button,
  raised,
  Screen,
  Spinner,
  SystemView as View
} from "nativesystem";
import { connect } from "react-redux";
import type {
  NavigationScreenProp,
  NavigationStateRoute
} from "react-navigation";
import { SafeAreaView } from "react-navigation";
import g from "glamorous-native";

import { createTabBarButton, createTabBarIcon } from "../TabBar/index";
import { hasOrders, isPending, orders } from "../Redux/selectors";
import { Text, FeedbackButton, FeedbackContent } from "../../Components";
import { fetchAllData } from "../Redux/index";
import { OrderList } from "./OrderList";
import type { Id, Order } from "parcley";
import { Logo } from "../../Components";
import { Header } from "../Header";

const RaisedView = g(View)(raised, backgroundColor);

type Props = {
  navigation: NavigationScreenProp<NavigationStateRoute>
};
type MappedProps = {
  isPending: boolean,
  hasOrders: boolean,
  orders: { [Id]: Order }
};

class DashboardList extends React.Component<ReduxProps<Props, MappedProps>> {
  componentDidMount() {
    this.props.dispatch(fetchAllData());
  }

  toNewOrder = () => this.props.navigation.navigate("NewOrder");
  toDetail = uid => this.props.navigation.navigate("Detail", { uid });

  render() {
    const { hasOrders, isPending } = this.props;
    return (
      <Screen
        color="white"
        f={1}
        jc="center"
        statusBarColor="white"
        statusBarStyle="dark-content"
      >
        <View f={1} pt={80}>
          {isPending && (
            <View jc="center" f={1}>
              <Spinner color="ufoGreen" size="large" />
            </View>
          )}
          {!isPending &&
            !hasOrders && (
              <View f={1} px={3} jc="center">
                <View my={1}>
                  <Text bold modifier="large" color="raisinBlack">
                    You don't have any joined orders yet!
                  </Text>
                </View>
                <View>
                  <Text color="raisinBlack">Create or join one to begin.</Text>
                </View>
                <View as="center" w={200} my={4}>
                  <Button
                    raised={20}
                    color="ufoGreen"
                    onPress={this.toNewOrder}
                  >
                    <Text color="white">Go!</Text>
                  </Button>
                </View>
              </View>
            )}
          {!isPending && hasOrders && <OrderList onItemPress={this.toDetail} />}
        </View>
        <Header />
      </Screen>
    );
  }
}

const mapStateToProps = (state): MappedProps => ({
  isPending: isPending(state),
  orders: orders(state),
  hasOrders: hasOrders(state)
});
const ConnectedDashboard = connect(mapStateToProps)(DashboardList);
export { ConnectedDashboard as DashboardList };
