// @flow
import * as React from 'react';
import { View, Base } from 'nativesystem';

import { Circle, Icon, Text, Background, ScoreCircle } from '../../Components';

import type { Member } from 'parcley';

type Props = {
  member: Member,
  host?: boolean,
  self?: boolean,
  onPress?: () => any,
};
const MemberItem = ({ host, member, onPress, self }: Props) => (
  <Base onPress={onPress} background={Base.Ripple('ufoGreen', false)}>
    <Background color="white" py={1}>
      <View fd="row" ai="center" my={1} px={3}>
        <ScoreCircle size={64} color="gunMetal" mr={2} raised={10}>
          {member.quantity === 0 ? 0 : member.quantity || '-'}
        </ScoreCircle>
        <View fd="row" f={1} ai="center">
          <Text bold modifier="large">
            {member.username}
          </Text>
          {self && (
            <View pl={1}>
              <Text color="sonicSilver" modifier="small" bold>
                {' '}
                (You)
              </Text>
            </View>
          )}
        </View>
        {host && (
          <View>
            <Icon name="home" size={28} color="ufoGreen" />
          </View>
        )}
      </View>
    </Background>
  </Base>
);

export { MemberItem };
