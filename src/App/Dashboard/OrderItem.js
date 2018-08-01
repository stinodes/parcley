// @flow
import * as React from 'react'
import {backgroundColor, Base, flex, raised, space, SystemView as View} from 'nativesystem'
import g from 'glamorous-native'

import type {Order, Member} from 'coolio'
import {Text} from '../../Components'

type Props = {
  order: Order,
  onPress: () => any,
}

const Scroll = g.scrollView(flex, space)
const Circle = g.view(
  {justifyContent: 'center', alignItems: 'center'},
  ({size}) => ({width: size, height: size, borderRadius: size * 0.5}),
  space, backgroundColor, raised
)
const OrderItem = ({order, onPress}: Props) => {
  const members: Member[] = Object.keys(order.members)
    .map(key => order.members[key])
  const total = members
    .map(member => member.score)
    .reduce((prev, value) => prev + value, 0)
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
            <Text color="raisinBlack">
              By: [Insert Username]
            </Text>
            <Text color="raisinBlack" modifier="small">
              {order.startedOn}
            </Text>
          </View>
        </View>
        <Scroll horizontal contentContainerStyle={{paddingVertical: 8, paddingHorizontal: 32}}>
          {members.map(member => (
            <Circle key={member.uid} color="gunMetal" size={48} mr={1} raised={5}>
              <Text bold color="white" modifier="small">
                {member.score}
              </Text>
            </Circle>
          ))}
        </Scroll>
      </View>
    </Base>
  )
}

export {OrderItem}
