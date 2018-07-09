// @flow
import * as React from 'react'
import {createTabBarButton, createTabBarIcon} from './TabBar'

type Props = {

}

class NewMatch extends React.Component<Props> {
  static navigationOptions = {
    tabBarIcon: createTabBarIcon('plus', 'frenchSky'),
    tabBarButtonComponent: createTabBarButton('frenchSky'),
  }
  render() {
    return null
  }
}

export {NewMatch}
