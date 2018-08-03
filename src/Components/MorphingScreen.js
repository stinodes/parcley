// @flow
import * as React from 'react';
import { Animated, Dimensions, StatusBar } from 'react-native';
import type { Layout } from '../Utils';
import type { Styles } from 'nativesystem';

type Props = {
  expanded: boolean,
  morphLayout: Layout,
  expandedStyle?: Styles,

  onAnimationEnd?: () => any,
  children?: React.Node,
  style?: any,
};
type State = {
  animation: Animated.Value,
};

class MorphingScreen extends React.Component<Props, State> {
  state = {
    animation: new Animated.Value(0),
  };

  static Collapsed = (props: { children: React.Node }) => {};
  static Expanded = (props: { children: React.Node }) => {};

  componentDidMount() {
    if (this.props.expanded) this.expand();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.expanded && !this.props.expanded) this.collapse();
    if (!prevProps.expanded && this.props.expanded) this.expand();
  }

  expand() {
    Animated.spring(this.state.animation, {
      toValue: 1,
      useNativeDriver: true,
    }).start(this.props.onAnimationEnd);
  }

  collapse() {
    Animated.spring(this.state.animation, {
      toValue: 0,
      useNativeDriver: true,
    }).start(this.props.onAnimationEnd);
  }

  get transform(): Object[] {
    const { animation } = this.state;
    const {
      morphLayout: { x, y, w, h, px, py },
    } = this.props;
    const { width: windowWidth, height: windowHeight } = Dimensions.get(
      'window',
    );
    const screenWidth = windowWidth;
    const screenHeight = windowHeight - (StatusBar.currentHeight || 0);
    const xScale = w / screenWidth;
    const yScale = h / screenHeight;
    return [
      {
        translateX: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [(px || x) - screenWidth * 0.5 + w * 0.5, 0],
          extrapolateLeft: 'clamp',
        }),
      },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [(py || y) - screenHeight * 0.5 + h * 0.5, 0],
          extrapolateLeft: 'clamp',
        }),
      },
      {
        scaleX: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [xScale, 1],
          extrapolateLeft: 'clamp',
        }),
      },
      {
        scaleY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [yScale, 1],
          extrapolateLeft: 'clamp',
        }),
      },
    ];
  }

  get collapsedChildrenScale(): Object[] {
    const { animation } = this.state;
    const {
      morphLayout: { x, y, w, h, px, py },
    } = this.props;
    const { width: windowWidth, height: windowHeight } = Dimensions.get(
      'window',
    );
    const screenWidth = windowWidth;
    const screenHeight = windowHeight - (StatusBar.currentHeight || 0);
    const xScale = screenWidth / w;
    const yScale = screenHeight / h;
    return [
      {
        scaleX: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [xScale, 1],
          extrapolateLeft: 'clamp',
        }),
      },
      {
        scaleY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [yScale, 1],
          extrapolateLeft: 'clamp',
        }),
      },
    ];
  }

  render() {
    const {
      children,
      style,
      expanded,
      expandedStyle,
      morphLayout,
    } = this.props;
    if (!morphLayout) return null;

    const collapsedChildren = React.Children.toArray(children).reduce(
      (prev, child) =>
        child.type === MorphingScreen.Collapsed ? child.props.children : prev,
      [],
    );
    const expandedChildren = React.Children.toArray(children).reduce(
      (prev, child) =>
        child.type === MorphingScreen.Expanded ? child.props.children : prev,
      [],
    );
    return (
      <Animated.View
        style={[
          style,
          expanded && expandedStyle,
          { position: 'absolute', top: 0, bottom: 0, right: 0, left: 0 },
          { transform: this.transform },
        ]}>
        <Animated.View
          style={[
            { position: 'absolute', top: 0, bottom: 0, right: 0, left: 0 },
            { alignItems: 'center', justifyContent: 'center' },
            { transform: this.collapsedChildrenScale },
            {
              opacity: this.state.animation.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0],
              }),
            },
          ]}>
          {collapsedChildren}
        </Animated.View>

        <Animated.View style={[{ flex: 1 }, { opacity: this.state.animation }]}>
          {expandedChildren}
        </Animated.View>
      </Animated.View>
    );
  }
}

export { MorphingScreen };
