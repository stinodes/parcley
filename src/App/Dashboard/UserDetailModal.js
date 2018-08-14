// @flow
import * as React from 'react';
import { Animated, Dimensions } from 'react-native';
import { Coordinator, Element, View } from 'nativesystem';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

import { Background, Modal } from '../../Components';

type Props = {
  visible: boolean,
  sharedNode: React.Node,
  startPosition: { x: number, y: number, w: number, h: number },
  onRequestClose: () => any,
};
type ComponentState = {
  animation: Animated.Value,
};

class UserDetailModal extends React.Component<Props, ComponentState> {
  state = {
    animation: new Animated.Value(Dimensions.get('window').height),
  };

  height = Dimensions.get('window').height;
  gestureEvent = Animated.event(
    [{ nativeEvent: { translationY: this.state.animation } }],
    { userNativeDriver: true },
  );

  static getDerivedStateFromProps() {}

  gestureEventStateChange = ({
    nativeEvent: { state, translationY, velocityY },
  }: {
    nativeEvent: { state: number, translationY: number, velocityY: number },
  }) => {
    if (state === State.END) {
      if (translationY < 75)
        Animated.spring(this.state.animation, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      else
        Animated.spring(this.state.animation, {
          toValue: this.height,
          velocity: velocityY,
          overshootClamping: true,
          useNativeDriver: true,
        }).start(this.props.onRequestClose);
    }
  };

  createAnimation = ({
    animation,
    toValue,
  }: {
    animation: Animated.Value,
    toValue: number,
  }) => {
    if (toValue === 1)
      return Animated.parallel([
        Animated.timing(animation, {
          toValue,
          duration: 0,
          useNativeDriver: true,
        }),
        Animated.spring(this.state.animation, {
          toValue,
          useNativeDriver: true,
        }),
      ]);
    return Animated.sequence([
      Animated.spring(this.state.animation, {
        toValue: this.height,
        useNativeDriver: true,
      }),
      Animated.timing(animation, {
        toValue,
        duration: 0,
        useNativeDriver: true,
      }),
    ]);
  };

  render() {
    const {
      visible,
      startPosition: { x, y, w, h },
      sharedNode,
    } = this.props;
    const height = this.height;
    return (
      <Modal
        visible={visible}
        onRequestClose={this.props.onRequestClose}
        createAnimation={this.createAnimation}>
        <View f={1}>
          <Coordinator
            f={1}
            animation={this.state.animation.interpolate({
              inputRange: [0, height],
              outputRange: [height, 0],
              extrapolate: 'clamp',
            })}
            inputRange={[0, height]}>
            <Element
              positioning={{ top: 0, bottom: 0, left: 0, right: 0 }}
              start={{ opacity: 0 }}
              end={{ opacity: 1 }}>
              <Background f={1} color="white" />
            </Element>
            <Element
              positioning={{ top: 0, left: 0 }}
              start={{ x, y }}
              end={{ x: 0, y: 80 }}>
              <PanGestureHandler
                onHandlerStateChange={this.gestureEventStateChange}
                onGestureEvent={this.gestureEvent}>
                <View w={w} h={h}>
                  {sharedNode}
                </View>
              </PanGestureHandler>
            </Element>
          </Coordinator>
        </View>
      </Modal>
    );
  }
}

export { UserDetailModal };
