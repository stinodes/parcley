// @flow
import * as React from 'react';
import { Separator } from 'nativesystem/lib/Components/Separator';
import {
  backgroundColor,
  flex,
  size,
  space,
  SystemView as View,
  Coordinator,
  Element,
} from 'nativesystem';
import moment from 'moment';
import { Animated, Dimensions } from 'react-native';
import g from 'glamorous-native';

import { Circle, Icon, Text } from '../../Components';

import type { Member, Order, Id } from 'parcley';

const AnimatedView = g(Animated.View)(flex, space, size, backgroundColor);

type Props = {
  order: Order,
  members: { [Id]: Member },
  scrollAnimation: Animated.Value,
  height: number,
  collapsedHeight: number,
};

class OrderInformation extends React.Component<Props> {
  render() {
    const {
      order,
      height,
      scrollAnimation,
      collapsedHeight,
      members,
    } = this.props;
    const width = Dimensions.get('window').width;

    const membersArray: Member[] = Object.keys(members).map(
      key => members[key],
    );

    const total = membersArray
      .map(member => member.quantity)
      .filter(quantity => quantity)
      .reduce((prev, value) => prev + parseInt(value), 0);

    const heightOrMin = Math.max(collapsedHeight, height - collapsedHeight);
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
                    <View px={1}>
                      <Text color="white" bold numberOfLines={1}>
                        {total}
                      </Text>
                    </View>
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
