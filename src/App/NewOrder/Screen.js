// @flow
import * as React from 'react';
import {
  backgroundColor,
  Button,
  raised,
  Screen,
  SystemView as View,
  Base,
  space,
  text,
  flex,
} from 'nativesystem';
import { ScrollView, Animated } from 'react-native';
import g from 'glamorous-native';
import Icon from 'react-native-vector-icons/Feather';

import { CreateOrderForm } from './CreateOrderForm';
import { JoinOrderForm } from './JoinOrderForm';
import { Header } from '../Header';
import { Text } from '../../Components';
import { connect } from 'react-redux';
import { createOrder, isPending, isSuccessful } from './Redux';
import type { CreateOrderValues } from './Saga';
import { SuccessAlert } from './SuccessAlert';

const absolute = { position: 'absolute', top: 0, left: 0, right: 0 };
const AbsoluteAnimate = g(Animated.View)(absolute, space, flex);
const AnimatedView = g(Animated.View)(space, flex);
const RaisedView = g(View)(backgroundColor, raised);
const GIcon = g(Icon)(text, { fontSize: 28 });

type Props = {};
type MappedProps = {};
type State = {
  joinHeight: ?number,
  joinAnimation: Animated.Value,
  isJoinCollapsed: boolean,
  showSuccess: boolean,
};

class NewOrder extends React.Component<ReduxProps<Props, MappedProps>, State> {
  state = {
    joinHeight: null,
    joinAnimation: new Animated.Value(0),
    isJoinCollapsed: false,
    showSuccess: false,
  };

  static getDerivedStateFromProps(props, state) {
    console.log(
      'pending',
      props.pending,
      'successfull',
      props.isSuccessful,
      'showSuccess',
      state.showSuccess,
    );
    if (!props.pending && props.isSuccessful && !state.showSuccess)
      return { showSuccess: true };
    return null;
  }

  showJoin = () => {
    this.animate(1);
  };
  hideJoin = () => {
    this.animate(0);
  };

  animate = (toValue: number) => {
    Animated.spring(this.state.joinAnimation, { toValue }).start();
  };

  onJoinContainerLayout = ({
    nativeEvent: {
      layout: { height },
    },
  }: {
    nativeEvent: { layout: { height: number } },
  }) => {
    this.setState({ joinHeight: height });
  };

  render() {
    return (
      <Screen
        f={1}
        color="white"
        statusBarColor="white"
        statusBarStyle="dark-content">
        <View f={1} pt={80}>
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ flexGrow: 1 }}>
            <Animated.View
              style={{
                height: this.state.joinAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, (this.state.joinHeight || 1) - 75],
                }),
              }}
            />
            <View alignItems="stretch">
              <Base
                background={Base.Ripple('frenchSky', true)}
                onPress={Base.delayHandler(this.showJoin)}>
                <View py={2} px={3}>
                  <Text bold modifier="large">
                    Join an Order
                  </Text>
                </View>
              </Base>
            </View>
            <CreateOrderForm />
          </ScrollView>
        </View>
        <AbsoluteAnimate
          onLayout={this.onJoinContainerLayout}
          pb={3}
          style={{
            transform: [
              {
                translateY: this.state.joinAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-1 * ((this.state.joinHeight || 1) + 50), 50],
                }),
              },
            ],
          }}>
          <RaisedView raised={19} pt={3} color="white">
            <JoinOrderForm close={this.hideJoin} />
          </RaisedView>
        </AbsoluteAnimate>
        <Header />
        <SuccessAlert
          isVisible={this.state.showSuccess}
          onHide={() => this.setState({ showSuccess: false })}
        />
      </Screen>
    );
  }
}

const mapStateToProps = (state): MappedProps => ({
  isPending: isPending(state),
  isSuccessful: isSuccessful(state),
});
const ConnectedNewOrder = connect(mapStateToProps)(NewOrder);
export { ConnectedNewOrder as NewOrder };
