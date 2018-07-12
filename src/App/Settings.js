// @flow
import * as React from 'react'
import {Button, Screen, SystemView as View} from 'nativesystem'
import {createTabBarButton, createTabBarIcon} from './TabBar'
import {logout} from '../Onboarding/helpers'
import {Text} from '../Components'

type Props = {

}

class Settings extends React.Component<Props> {
  static navigationOptions = {
    tabBarIcon: createTabBarIcon('sliders', 'error'),
    tabBarButtonComponent: createTabBarButton('error'),
  }
  render() {
    return (
      <Screen
        color="white" f={1}
        statusBarColor="white"
        statusBarStyle="dark-content">
        <View f={1}>
        </View>
        <Button color="transparent" onPress={logout}>
          <Text color="error">
            Log out
          </Text>
        </Button>
      </Screen>
    )
  }
}

export {Settings}
