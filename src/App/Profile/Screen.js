// @flow
import * as React from 'react';
import { Button, Screen, View, Absolute } from 'nativesystem';
import { Separator } from 'nativesystem/lib/Components/Separator';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native';

import { logout } from '../../Onboarding/helpers';
import { Background, Text } from '../../Components';
import { friends, users } from '../Redux/selectors';
import { meInfo } from '../../Onboarding/Redux/selectors';
import { Header } from '../Header';

import type { Id, FriendInformation, UserInformation } from 'parcley';
import { FriendItem } from './FriendItem';

type Props = {};
type MappedProps = {
  friends: {|
    [Id]: FriendInformation,
  |},
  users: {|
    [Id]: UserInformation,
  |},
  user: UserInformation,
};

class Profile extends React.Component<ReduxProps<Props, MappedProps>> {
  infoHeight = 100;

  render() {
    const { user, friends, users } = this.props;
    const friendArray = Object.keys(friends).map(key => friends[key]);
    console.log(user);
    return (
      <Screen
        color="white"
        f={1}
        statusBarColor="white"
        statusBarStyle="dark-content">
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            flexGrow: 1,
            paddingTop: 80 + this.infoHeight,
          }}>
          {!friendArray.length && (
            <View px={3} py={3}>
              <Text color="raisinBlack" bold>
                You don't have any friends yet. :(
              </Text>
            </View>
          )}
          {friendArray.map(friend => (
            <FriendItem friend={friend} user={users[friend.uid]} />
          ))}
        </ScrollView>
        <Button color="transparent" onPress={logout}>
          <Text color="error">Log out</Text>
        </Button>

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
            <Separator color="gainsBoro" />
          </Background>
        </Absolute>

        <Header />
      </Screen>
    );
  }
}

const mapStateToProps = (state): MappedProps => ({
  friends: friends(state),
  users: users(state),
  user: meInfo(state),
});
const ConnectedProfile = connect(mapStateToProps)(Profile);

export { ConnectedProfile as Profile };
