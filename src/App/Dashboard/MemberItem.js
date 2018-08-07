// @flow
import * as React from 'react';
import { SystemView as View } from 'nativesystem';

import { Circle, Icon, Text } from '../../Components';

import type { Member } from 'parcley';

type Props = {
  member: Member,
  host?: boolean,
};
const MemberItem = ({ host, member }: Props) => (
  <View py={2}>
    <View fd="row" ai="center" my={1} px={3}>
      <Circle size={64} color="gunMetal" mr={2} raised={10}>
        <Text bold modifier="large" color="white">
          {member.score}
        </Text>
      </Circle>
      <View fd="column" f={1}>
        <Text bold modifier="large" color="raisinBlack">
          {member.username}
        </Text>
      </View>
      {host && (
        <View>
          <Icon name="target" size={28} color="ufoGreen" />
        </View>
      )}
    </View>
  </View>
);

export { MemberItem };
