// @flow
import * as React from 'react'
import type {NavigationProp, NavigationStateRoute, NavigationScreenConfigProps} from 'react-navigation'
import {SystemView as View, Screen, Button, Text, text, Base} from 'nativesystem'
import * as firebase from 'firebase'
import {createTabBarButton, createTabBarIcon, TabBarButton, TabBarIcon} from './TabBar'

const DashboardTabBarIcon = (props: {focused: boolean}) => <TabBarIcon {...props} color="ufoGreen" name="dashboard"/>

type Props = {
  navigation: NavigationProp<NavigationStateRoute>,
}
class Dashboard extends React.Component<Props> {
  static navigationOptions = {
    tabBarIcon: createTabBarIcon('list', 'ufoGreen'),
    tabBarButtonComponent: createTabBarButton('ufoGreen'),
  }
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
