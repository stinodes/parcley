// @flow
import * as React from 'react'
import type {NavigationProp, NavigationStateRoute} from 'react-navigation'
import {SystemView as View, Screen, Button, Text,} from 'nativesystem'
import * as firebase from 'firebase'

type Props = {
  navigation: NavigationProp<NavigationStateRoute>,
}
class Dashboard extends React.Component<Props> {
  logOut = () => firebase.auth().signOut()
  
  render() {
    return (
      <Screen 
        color="white" f={1} jc="center"
        statusBarColor="white"
        statusBarStyle="dark-content">
        <View px={4}>
          <Button
            color="ufoGreen"
            onPress={this.logOut}>
            <Text color="white" bold>
              Log uit
            </Text>
          </Button>
        </View>
      </Screen>
    )
  }
}

export {Dashboard}
