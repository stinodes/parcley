// @flow
import * as React from "react";
import { Animated } from "react-native";
import { Button, View, Coordinator, Element } from "nativesystem";

import { ratio } from "../../../colors";
import { Text, Icon } from "../../Components";

import type { FriendInformation } from "parcley";

type Props = {
  friend: FriendInformation,
  onDelete: () => any
};
type State = {
  isDeleteShown: boolean
};

class DeleteFriendButton extends React.Component<Props, State> {
  state = {
    isDeleteShown: false
  };

  animation = new Animated.Value(0);

  animate = () =>
    this.state.isDeleteShown ? this.animateOut() : this.animateIn();
  animateIn = () =>
    Animated.spring(this.animation, {
      toValue: 1,
      useNativeDriver: true
    }).start(() => this.setState({ isDeleteShown: true }));
  animateOut = () =>
    Animated.spring(this.animation, {
      toValue: 0,
      useNativeDriver: true
    }).start(() => this.setState({ isDeleteShown: false }));

  render() {
    const { friend } = this.props;
    return (
      <View px={3}>
        <Coordinator
          layoutProps={{ fd: "row" }}
          animation={this.animation}
          inputRange={[0, 1]}
        >
          <View pr={1}>
            <Element relative start={{ x: 32 }} end={{ x: 0 }}>
              <Button modifier="small" color="error" onPress={this.animate}>
                <Text modifier="small" color="white">
                  {friend.rank}
                </Text>
              </Button>
            </Element>
          </View>
          <Element relative start={{ x: 100 }} end={{ x: 0 }}>
            <Button color="error" onPress={this.props.onDelete}>
              <Icon name="trash" color="white" />
            </Button>
          </Element>
        </Coordinator>
      </View>
    );
  }
}

export { DeleteFriendButton };
