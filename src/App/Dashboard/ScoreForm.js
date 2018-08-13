// @flow
import * as React from 'react';
import { withFormik } from 'formik';
import { Screen, View, flex, space, size } from 'nativesystem';
import { Animated, Dimensions } from 'react-native';
import g from 'glamorous-native';

import { Modal, Text } from '../../Components';

const AnimatedView = g(Animated.View)(flex, space, size);

type Props = {
  visible: boolean,
  width?: number,
  onRequestClose: () => any,
  children: React.Node,
};
type State = {
  animation: Animated.Value,
};

class ScoreForm extends React.Component<Props, State> {
  state = {
    animation: new Animated.Value(0),
  };
  componentDidUpdate(prevProps) {
    if (prevProps.visible && !this.props.visible) this.animate(0);
    if (this.props.visible && !prevProps.visible) this.animate(1);
  }
  animate = (toValue: number) => {
    Animated.spring(this.state.animation, {
      toValue,
      useNativeDriver: true,
    }).start();
  };

  render() {
    const {
      onRequestClose,
      children,
      width = Dimensions.get('window').width,
    } = this.props;
    const { animation } = this.state;

    return (
      <AnimatedView
        fd="row"
        w={width * 2}
        style={{
          transform: [
            {
              translateX: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -width],
              }),
            },
          ],
        }}>
        <View w={width}>{children}</View>
        <View w={width} />
      </AnimatedView>
    );
  }
}

const FScoreForm = withFormik({
  mapPropsToValues: () => ({ score: '' }),
})(ScoreForm);

export { FScoreForm as ScoreForm };
