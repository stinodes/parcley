// @flow
import * as React from "react";
import { Dimensions, Animated } from "react-native";
import { View, Button, Absolute, Coordinator, Element } from "nativesystem";

import { Text, Icon } from "../Components";
import { ratio } from "../../colors";

type OptionProps = {
  onPress: () => any,
  icon: string,
  children: string
};
const Option = (props: OptionProps) => null;

type Props = {
  position?: "top" | "bottom",
  color: string,
  children: React.Node
};
type State = {
  visible: boolean
};

class CollapsableOptions extends React.Component<Props, State> {
  state = {
    visible: false
  };
  buttonWidth = 100;
  animation = new Animated.Value(0);

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (this.state.visible !== prevState.visible) {
      this.animate(this.state.visible ? 1 : 0);
    }
  }

  show = () => this.setState({ visible: true });
  hide = () => this.setState({ visible: false });
  animate = (toValue: number) =>
    Animated.spring(this.animation, { toValue, useNativeDriver: true }).start();

  render() {
    const { color, children } = this.props;
    const { visible } = this.state;
    const options = React.Children.toArray(children)
      .filter(child => child.type === Option)
      .reverse();
    const width = Dimensions.get("window").width;
    return (
      <Coordinator animation={this.animation} inputRange={[0, 1]}>
        {options.map((option, i, arr) => (
          <Element
            start={{ y: 100 }}
            end={{
              y: -(100 * ratio * i + 8 * (i + 1))
            }}
            positioning={{
              bottom: 0,
              left: 0,
              right: 0
            }}
          >
            <View as="center">
              <Button
                modifier="small"
                color="error"
                onPress={option.props.onPress}
                ripple="white"
              >
                <View pr={1}>
                  <Icon
                    name={option.props.icon}
                    color="white"
                    modifier="icon"
                  />
                </View>
                <Text color="white">{option.props.children}</Text>
              </Button>
            </View>
          </Element>
        ))}
        <Element
          start={{ y: -8 }}
          end={{
            y: -(100 * ratio * options.length + 8 * (options.length + 1))
          }}
          positioning={{
            bottom: 0,
            left: 0,
            right: 0
          }}
        >
          <View as="center">
            <Button
              modifier="small"
              color="error"
              onPress={this.state.visible ? this.hide : this.show}
              ripple="white"
            >
              <View>
                <Icon name="more-horizontal" color="white" modifier="icon" />
              </View>
            </Button>
          </View>
        </Element>
      </Coordinator>
    );
  }
}

export { CollapsableOptions, Option };
