// @flow
import * as React from "react";
import { Button, Screen, View, Absolute } from "nativesystem";
import { Separator } from "nativesystem/lib/Components/Separator";
import { connect } from "react-redux";
import { ScrollView } from "react-native";

import { logout } from "../../Onboarding/helpers";
import { Background, Text, CollapsableOptions, Option } from "../../Components";
import { friends, users } from "../Redux/selectors";
import { meInfo } from "../../Onboarding/Redux/selectors";
import { Header } from "../Header";

import type { Id, FriendInformation, UserInformation } from "parcley";
import { FriendItem } from "./FriendItem";

type Props = {};
type MappedProps = {
  friends: {
    [Id]: FriendInformation
  },
  users: {
    [Id]: UserInformation
  },
  user: ?UserInformation
};

class Profile extends React.Component<ReduxProps<Props, MappedProps>> {
  infoHeight = 100;

  render() {
    const { user, friends, users } = this.props;
    const friendArray = Object.keys(friends)
      .filter(key => friends[key] && friends[key].friend)
      .map(key => friends[key]);

    const arr = ["red", "blue", "green"];

    if (!user) return null;

    return (
      <Screen
        color="white"
        f={1}
        statusBarColor="white"
        statusBarStyle="dark-content"
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            flexGrow: 1,
            paddingTop: 80 + this.infoHeight
          }}
        >
          {!friendArray.length && (
            <View px={3} py={3}>
              <Text color="raisinBlack" bold>
                You don't have any friends yet.
              </Text>
              <Text color="raisinBlack" modifier="small">
                Loser.
              </Text>
            </View>
          )}
          {friendArray.map(friend => (
            <FriendItem
              meUid={user.uid}
              friend={friend}
              user={users[friend.uid]}
            />
          ))}
        </ScrollView>

        <Absolute h={this.infoHeight} t={80} l={0} r={0}>
          <Background color="white" jc="space-between" px={3} f={1}>
            <View py={1}>
              <Text bold modifier="large" color="raisinBlack" align="center">
                {user.username}
              </Text>
            </View>
            <View pb={2}>
              <Text modifier="small" bold color="raisinBlack" align="center">
                E-mail address:
              </Text>
              <Text modifier="small" color="raisinBlack" align="center">
                {user.email}
              </Text>
            </View>
          </Background>
          <View px={3}>
            <Separator color="gainsBoro" />
          </View>
        </Absolute>
        <Header />
        <CollapsableOptions color="error">
          <Option icon="edit" onPress={() => {}}>
            Edit Profile
          </Option>
          <Option icon="plus-circle" onPress={() => {}}>
            Add Friend
          </Option>
          <Option icon="log-out" onPress={logout}>
            Log out
          </Option>
        </CollapsableOptions>
      </Screen>
    );
  }
}

const mapStateToProps = (state): MappedProps => ({
  friends: friends(state),
  users: users(state),
  user: meInfo(state)
});
const ConnectedProfile = connect(mapStateToProps)(Profile);

export { ConnectedProfile as Profile };
