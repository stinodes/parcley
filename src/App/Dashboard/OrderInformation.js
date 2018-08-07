// @flow
import * as React from 'react';
import { Separator } from 'nativesystem/lib/Components/Separator';
import {
  SystemView as View,
  flex,
  space,
  size,
  backgroundColor,
} from 'nativesystem';
import moment from 'moment';
import { Animated, Dimensions } from 'react-native';
import g from 'glamorous-native';

import { Circle, Text } from '../../Components';

import type { Member, Order } from 'parcley';

const AnimatedView = g(Animated.View)(flex, space, size, backgroundColor);

type Props = {
  order: Order,
  scrollAnimation: Animated.Value,
  height: number,
};
class OrderInformation extends React.Component<Props> {
  collapsedHeight = 80;

  render() {
    const { order, height, scrollAnimation } = this.props;
    const width = Dimensions.get('window').width;

    const members: Member[] = Object.keys(order.members).map(
      key => order.members[key],
    );

    const total = members
      .map(member => member.score)
      .reduce((prev, value) => prev + value, 0);

    const heightOrMin = Math.max(
      this.collapsedHeight,
      height - this.collapsedHeight,
    );
    const inputRange = [0, heightOrMin];
    const extrapolate = 'clamp';

    return (
      <AnimatedView
        color="white"
        px={3}
        style={{
          transform: [
            {
              translateY: scrollAnimation.interpolate({
                inputRange,
                outputRange: [0, -heightOrMin],
                extrapolateRight: 'clamp',
              }),
            },
          ],
        }}>
        <View>
          <AnimatedView
            pb={1}
            style={{
              transform: [
                {
                  translateY: scrollAnimation.interpolate({
                    inputRange,
                    outputRange: [0, heightOrMin + this.collapsedHeight - 50],
                    extrapolate,
                  }),
                },
                {
                  scale: scrollAnimation.interpolate({
                    inputRange,
                    outputRange: [1, 1.2],
                    extrapolate,
                  }),
                },
              ],
            }}>
            <Text align="center" bold modifier="large">
              {order.name}
            </Text>
          </AnimatedView>

          <AnimatedView
            ai="center"
            py={1}
            style={{
              transform: [
                {
                  translateX: scrollAnimation.interpolate({
                    inputRange,
                    outputRange: [0, -width * 0.5 + 50],
                    extrapolate,
                  }),
                },
                {
                  translateY: scrollAnimation.interpolate({
                    inputRange,
                    outputRange: [0, 75],
                    extrapolate,
                  }),
                },
                {
                  scale: scrollAnimation.interpolate({
                    inputRange,
                    outputRange: [1, 0.64],
                    extrapolate,
                  }),
                },
              ],
            }}>
            <Circle color="ufoGreen" size={100} raised={10}>
              <AnimatedView
                style={{
                  transform: [
                    {
                      scale: scrollAnimation.interpolate({
                        inputRange,
                        outputRange: [2, 1.64],
                        extrapolate,
                      }),
                    },
                  ],
                }}>
                <Text bold modifier="large" color="white">
                  {total}
                </Text>
              </AnimatedView>
            </Circle>
          </AnimatedView>

          <AnimatedView
            py={2}
            style={{
              opacity: scrollAnimation.interpolate({
                inputRange: [0, heightOrMin * 0.6, heightOrMin],
                outputRange: [1, 0, 0],
              }),
            }}>
            <Text modifier="small" align="center">
              Code:{' '}
              <Text modifier="small" bold>
                {order.code}
              </Text>
            </Text>
            <Text modifier="small" align="center">
              Started on {moment(order.startedOn).format('dddd DD MMMM')}
            </Text>
          </AnimatedView>
        </View>
        <Separator color="gainsBoro" />
      </AnimatedView>
    );
  }
}

export { OrderInformation };
