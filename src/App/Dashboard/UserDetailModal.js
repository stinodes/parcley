// @flow
import * as React from 'react';
import { Animated } from 'react-native';
import { Coordinator, Element, View } from 'nativesystem';
import { Background, Modal } from '../../Components';

type Props = {
  visible: boolean,
  sharedNode: React.Node,
  startPosition: { x: number, y: number, w: number, h: number },
  onRequestClose: () => any,
};
type State = {
  animation: Animated.Value,
};

class UserDetailModal extends React.Component<Props, State> {
  state = {
    animation: new Animated.Value(0),
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
        Animated.timing(animation, { toValue, duration: 0 }),
        Animated.spring(this.state.animation, { toValue }),
      ]);
    return Animated.sequence([
      Animated.spring(this.state.animation, { toValue }),
      Animated.timing(animation, { toValue, duration: 0 }),
    ]);
  };

  render() {
    const {
      visible,
      startPosition: { x, y, w, h },
      sharedNode,
    } = this.props;
    return (
      <Modal
        visible={visible}
        onRequestClose={this.props.onRequestClose}
        createAnimation={this.createAnimation}>
        <Coordinator f={1} animation={this.state.animation} inputRange={[0, 1]}>
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
            <View w={w} h={h}>
              {sharedNode}
            </View>
          </Element>
        </Coordinator>
      </Modal>
    );
  }
}

export { UserDetailModal };
