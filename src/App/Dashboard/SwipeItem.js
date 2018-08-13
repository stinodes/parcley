// @flow
import * as React from 'react';
import { Screen, View, flex, space, size } from 'nativesystem';
import { Animated, Dimensions } from 'react-native';
import g from 'glamorous-native';

const AnimatedView = g(Animated.View)(flex, space, size);

type Props = {
  animation: Animated.Value,
  width?: number,
  children: React.Node,
};

const SwipeItem = ({
  animation,
  children,
  width = Dimensions.get('window').width,
}: Props) => {
  const childrenArray = React.Children.toArray(children);

  return (
    <AnimatedView
      fd="row"
      w={width * childrenArray.length}
      style={{
        transform: [
          {
            translateX: animation.interpolate({
              inputRange: [0, childrenArray.length - 1],
              outputRange: [0, -width * childrenArray.length],
            }),
          },
        ],
      }}>
      {childrenArray.map(child => (
        <View w={width}>{child}</View>
      ))}
    </AnimatedView>
  );
};

export { SwipeItem };
