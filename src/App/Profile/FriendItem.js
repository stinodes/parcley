// @flow
import * as React from "react";
import { View } from "nativesystem";
import { Separator } from "nativesystem/lib/Components/Separator";

import { deleteFriend } from "../helpers";
import { Text } from "../../Components";
import { DeleteFriendButton } from "./DeleteFriendButton";

import type { FriendInformation, UserInformation } from "parcley";

type Props = {
  friend: FriendInformation,
  user: UserInformation,
  meUid: string
};

const FriendItem = ({ meUid, user, friend }: Props) => {
  if (!user || !friend || !friend.friend) return null;
  return (
    <View py={2} fd="row" ai="center">
      <View px={3} f={1} pr={1}>
        <Text color="raisinBlack" modifier="large" bold>
          {user.username}
        </Text>
      </View>
      <DeleteFriendButton
        friend={friend}
        onDelete={() => deleteFriend(meUid, friend.uid)}
      />
    </View>
  );
};

export { FriendItem };
