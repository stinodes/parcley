// @flow
import * as React from 'react'
import {backgroundColor, Base, flex, raised, space, SystemView as View} from 'nativesystem'
import g from 'glamorous-native'

import type {Match} from 'coolio'
import {Text} from '../../Components'

type Props = {
  match: Match,
  onPress: () => any,
}

const Scroll = g.scrollView(flex, space)
const Circle = g.view(
  {justifyContent: 'center', alignItems: 'center'},
  ({size}) => ({width: size, height: size, borderRadius: size * 0.5}),
  space, backgroundColor, raised
)
const MatchItem = ({match, onPress}: Props) => {
  const total = Object.keys(match.scores)
    .map(key => match.scores[key])
    .reduce((prev, score) => prev + score)
  const members = Object.keys(match.members)
    .map(key => match.members[key])
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
              {match.name}
            </Text>
            <Text color="raisinBlack">
              By: {match.host.username}
            </Text>
            <Text color="raisinBlack" modifier="small">
              {match.startedOn}
            </Text>
          </View>
        </View>
        <Scroll horizontal contentContainerStyle={{paddingVertical: 8, paddingHorizontal: 32}}>
          {Object.keys(match.members).map(key => (
            <Circle color="gunMetal" size={48} mr={1} raised={5}>
              <Text bold color="white" modifier="small">
                {match.scores[key]}
              </Text>
            </Circle>
          ))}
        </Scroll>
      </View>
    </Base>
  )
}

export {MatchItem}
