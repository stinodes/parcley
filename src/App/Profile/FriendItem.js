// @flow
import * as React from 'react';
import { View } from 'nativesystem';
import { Separator } from 'nativesystem/lib/Components/Separator';

import type { FriendInformation, UserInformation } from 'parcley';
import { Text } from '../../Components';

type Props = {
  friend: FriendInformation,
  user: UserInformation,
};

const FriendItem = ({ user, friend }: Props) => {
  if (!user || !friend) return null;
  return (
    <View px={3}>
      <View py={2} fd="row" ai="center">
        <View f={1} pr={1}>
          <Text color="raisinBlack" modifier="large" bold>
            {user.username}
          </Text>
        </View>
        <Text modifier="small" color="error">
          {friend.rank}
        </Text>
      </View>
      <Separator color="gainsBoro" />
    </View>
  );
};

export { FriendItem };
