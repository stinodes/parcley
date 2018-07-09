// @flow
import * as React from 'react'
import {Base} from 'nativesystem'
import {createTabBarButton, createTabBarIcon, TabBarIcon} from './TabBar'

type Props = {

}

class Settings extends React.Component<Props> {
  static navigationOptions = {
    tabBarIcon: createTabBarIcon('sliders', 'error'),
    tabBarButtonComponent: createTabBarButton('error'),
  }
  render() {
    return null
  }
}

export {Settings}
