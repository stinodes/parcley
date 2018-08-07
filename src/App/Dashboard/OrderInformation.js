// @flow
import * as React from 'react';
import { Separator } from 'nativesystem/lib/Components/Separator';
import {
  backgroundColor,
  flex,
  size,
  space,
  SystemView as View,
} from 'nativesystem';
import moment from 'moment';
import { Animated, Dimensions } from 'react-native';
import g from 'glamorous-native';

import { Circle, Icon, Text } from '../../Components';

import type { Member, Order } from 'parcley';
import { Coordinator, Element } from '../../Components/AnimationCoordinator';

const AnimatedView = g(Animated.View)(flex, space, size, backgroundColor);

type Props = {
  order: Order,
  scrollAnimation: Animated.Value,
  height: number,
};

class _OrderInformation extends React.Component<Props> {
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
        color="red"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
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
            fd="row"
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
            <View w={40} />
            <View f={1}>
              <Text align="center" bold modifier="large">
                {order.name}
              </Text>
            </View>
            <AnimatedView
              w={40}
              ai="center"
              jc="center"
              style={{
                transform: [
                  {
                    translateY: scrollAnimation.interpolate({
                      inputRange,
                      outputRange: [height - 40, 0],
                      extrapolate,
                    }),
                  },
                  {
                    translateX: scrollAnimation.interpolate({
                      inputRange,
                      outputRange: [0, -30 * 1.2],
                      extrapolate,
                    }),
                  },
                ],
              }}>
              <Icon name="settings" color="sonicSilver" size={20} />
            </AnimatedView>
          </AnimatedView>

          <AnimatedView
            ai="center"
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
            <Circle color="ufoGreen" size={100}>
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

    return (
      <AnimatedView
        color="white"
        style={{
          position: 'absolute',
          top: 80,
          left: 0,
          right: 0,
          height: height,
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
        <View f={1}>
          <Coordinator
            layoutProps={{ f: 1 }}
            animation={scrollAnimation}
            inputRange={[0, heightOrMin]}>
            <Element
              positioning={{ top: 0, left: 0, right: 0 }}
              start={{ y: 0, scale: 1 }}
              end={{ y: heightOrMin - 10, scale: 1.2 }}
              extrapolate="clamp">
              <View h={40} ai="center" jc="center">
                <Text align="center" bold modifier="large">
                  {order.name}
                </Text>
              </View>
            </Element>

            <Element
              positioning={{ bottom: 0 }}
              start={{
                x: width * 0.5 - 120 * 0.5,
                scale: 1,
                y: -(height - 120 - 40),
              }}
              end={{ x: 0, scale: 0.64, y: (120 - 64) * 0.5 }}
              extrapolate="clamp">
              <View h={120} w={120} ai="center" jc="center">
                <Circle size={100} color="ufoGreen" raised={10}>
                  <Element relative start={{ scale: 2 }} end={{ scale: 2 }}>
                    <Text color="white" bold>
                      {total}
                    </Text>
                  </Element>
                </Circle>
              </View>
            </Element>
            <Element
              positioning={{ bottom: 16, left: 0, right: 0 }}
              start={{ opacity: 1 }}
              end={{ opacity: 0 }}
              extrapolate="clamp">
              <Text modifier="small" align="center">
                Code:{' '}
                <Text modifier="small" bold>
                  {order.code}
                </Text>
              </Text>
              <Text modifier="small" align="center">
                Started on {moment(order.startedOn).format('dddd DD MMMM')}
              </Text>
            </Element>
            <Element
              positioning={{ top: 0, right: 0 }}
              start={{ y: 0 }}
              end={{ y: heightOrMin + 20 }}
              extrapolate="clamp">
              <View h={40} w={40} jc="center" ai="center">
                <Icon name="settings" color="gainsBoro" size={26} />
              </View>
            </Element>
          </Coordinator>
        </View>
        <View px={3}>
          <Separator color="gainsBoro" />
        </View>
      </AnimatedView>
    );
  }
}

export { OrderInformation };
