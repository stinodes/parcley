// @flow
import * as React from 'react';
import { Dimensions, Animated, BackHandler } from 'react-native';
import g from 'glamorous-native';
import { SystemView as View } from 'nativesystem';
import type { CompositeAnimation } from 'react-native/Libraries/Animated/src/AnimatedImplementation';

const absolute = { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 };
const Absolute = g.view(absolute);
const ModalAnimator = g(Animated.View)(absolute);

type Props = {
  onRequestClose: () => any,
  visible: boolean,
  useNativeDriver?: boolean,
  onShow?: () => any,
  onShowEnd?: () => any,
  onHide?: () => any,
  onHideEnd?: () => any,
  onAnimate?: (value: number) => any,
  createAnimation?: ({
    animation: Animated.Value,
    toValue: number,
  }) => CompositeAnimation,
  children: React.Node,
};

class Modal extends React.Component<Props> {
  animation: Animated.Value;
  constructor(props: Props) {
    super(props);
    this.animation = new Animated.Value(props.visible ? 1 : 0);
  }

  componentDidMount() {
    this.props.onAnimate && this.animation.addListener(this.onAnimate);
    BackHandler.addEventListener('hardwareBackPress', this.handleBack);
  }
  componentWillUnmount() {
    this.animation.removeAllListeners();
    BackHandler.removeEventListener('hardwareBackPress', this.handleBack);
  }

  componentDidUpdate({ visible: prevVisible }: Props) {
    const { visible, onShow, onHide } = this.props;
    if (visible !== prevVisible) {
      visible ? onShow && onShow() : onHide && onHide();
      this.animate(visible ? 1 : 0);
    }
  }

  handleBack = () => {
    if (this.props.visible) {
      this.props.onRequestClose();
      return true;
    }
    return false;
  };

  animate = (toValue: 0 | 1) => {
    const { useNativeDriver = true, createAnimation } = this.props;
    if (createAnimation) {
      return createAnimation({ animation: this.animation, toValue }).start(
        this.onEnd,
      );
    }

    return Animated.spring(this.animation, {
      toValue,
      useNativeDriver: useNativeDriver,
    }).start(this.onEnd);
  };

  onEnd = () => {
    const { onShowEnd, onHideEnd, visible } = this.props;
    visible ? onShowEnd && onShowEnd() : onHideEnd && onHideEnd();
  };
  onAnimate = ({ value }: { value: number }) => {
    this.props.onAnimate && this.props.onAnimate(value);
  };

  render() {
    const { children } = this.props;
    const { height } = Dimensions.get('window');
    return (
      <ModalAnimator
        style={{
          transform: [
            {
              translateY: this.animation.interpolate({
                inputRange: [0, 1],
                outputRange: [height, 0],
              }),
            },
          ],
        }}>
        <Absolute>{children}</Absolute>
      </ModalAnimator>
    );
  }
}

export { Modal };
