// @flow
import * as React from 'react';
import {
  backgroundColor,
  Base,
  flex,
  raised,
  space,
  SystemView as View,
} from 'nativesystem';
import g from 'glamorous-native';
import moment from 'moment';
import { connect } from 'react-redux';

import type { Order, Member, Id } from 'parcley';
import { Circle, Text } from '../../Components';
import { members } from '../Redux/selectors';

type Props = {
  order: Order,
  onPress: () => any,
};
type MappedProps = {
  members: { [Id]: Member },
};

const Scroll = g.scrollView(flex, space);
const OrderItem = ({
  order,
  onPress,
  members,
}: ReduxProps<Props, MappedProps>) => {
  const membersArray: Member[] = Object.keys(members).map(key => members[key]);
  const total = membersArray
    .map(member => member.score)
    .filter(score => score)
    .reduce((prev, value) => prev + value, 0);
  console.log(order);
  const host = members[order.host];
  return (
    <Base background={Base.Ripple('ufoGreen', false)} onPress={onPress}>
      <View py={2}>
        <View fd="row" ai="center" my={1} px={3}>
          <Circle size={64} color="ufoGreen" mr={2} raised={10}>
            <Text bold modifier="large" color="white">
              {total}
            </Text>
          </Circle>
          <View fd="column" f={1}>
            <Text bold modifier="large" color="raisinBlack">
              {order.name}
            </Text>
            {host ? (
              <Text color="raisinBlack">By {host.username}</Text>
            ) : (
              <Text color="raisinBlack">-</Text>
            )}
            <Text color="raisinBlack" modifier="small">
              {moment(order.startedOn).format('dddd DD MMMM')}
            </Text>
          </View>
        </View>
        <Scroll
          horizontal
          contentContainerStyle={{ paddingVertical: 8, paddingHorizontal: 32 }}>
          {membersArray.map(member => (
            <Circle
              key={member.uid}
              color="gunMetal"
              size={48}
              mr={1}
              raised={5}>
              <Text bold color="white" modifier="small">
                {member.score === 0 ? 0 : member.score || '-'}
              </Text>
            </Circle>
          ))}
        </Scroll>
      </View>
    </Base>
  );
};

const mapStateToProps = (state, props: Props): MappedProps => ({
  members: members(state, props.order.uid),
});
const ConnectedOrderItem = connect(mapStateToProps)(OrderItem);
export { ConnectedOrderItem as OrderItem };
