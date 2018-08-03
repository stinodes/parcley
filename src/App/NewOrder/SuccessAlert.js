// @flow
import * as React from 'react';
import { Animated } from 'react-native';
import g from 'glamorous-native';
import Icon from 'react-native-vector-icons/Feather';
import {
  SystemView as View,
  backgroundColor,
  textColor,
  getColor,
  WithThemeFAC,
  raised,
  flex,
} from 'nativesystem';
import { transparentize } from 'polished';
import { Modal } from '../../Components';

const GIcon = g(Icon)(textColor);
const BGView = g(View)(backgroundColor);
const Circle = g(Animated.View)(
  {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  raised,
  backgroundColor,
  flex,
);

type Props = {
  isVisible: boolean,
  onHide: () => any,
};
type State = {
  animation: Animated.Value,
};

class SuccessAlert extends React.Component<Props, State> {
  state = {
    animation: new Animated.Value(0),
  };
  timeoutId: TimeoutID;

  componentDidUpdate(prevProps: Props) {
    if (!prevProps.isVisible && this.props.isVisible) this.startHideTimer();
  }

  componentWillUnmount() {
    if (this.timeoutId) clearTimeout(this.timeoutId);
  }

  startHideTimer() {
    this.timeoutId = setTimeout(this.props.onHide, 3000);
  }

  createAnimation = ({
    animation,
    toValue,
  }: {
    animation: Animated.Value,
    toValue: number,
  }) => {
    if (toValue === 1)
      return Animated.stagger(300, [
        Animated.spring(animation, { toValue, useNativeDriver: true }),
        Animated.spring(this.state.animation, {
          toValue,
          useNativeDriver: true,
        }),
      ]);
    else return Animated.spring(animation, { toValue, useNativeDriver: true });
  };
  animateHide = () => {
    Animated.timing(this.state.animation, {
      toValue: 0,
      duration: 0,
      useNativeDriver: true,
    }).start();
  };

  render() {
    return (
      <Modal
        visible={this.props.isVisible}
        onRequestClose={() => {}}
        createAnimation={this.createAnimation}
        onHideEnd={this.animateHide}
      >
        <WithThemeFAC>
          {({ theme }) => (
            <BGView
              f={1}
              jc="center"
              ai="center"
              color={transparentize(0.05, getColor(theme, 'gunMetal'))}
            >
              <Circle
                color="ufoGreen"
                jc="center"
                ai="center"
                style={{
                  transform: [
                    {
                      scale: this.state.animation,
                    },
                  ],
                }}
              >
                <GIcon name="check" color="white" size={80} />
              </Circle>
            </BGView>
          )}
        </WithThemeFAC>
      </Modal>
    );
  }
}

export { SuccessAlert };
