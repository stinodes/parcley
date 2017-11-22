// @flow
import React, { PureComponent } from 'react'
import { View, Text, TouchableOpacity, BackHandler } from 'react-native'
import { connect } from 'react-redux'
import { StackNavigator, addNavigationHelpers, NavigationActions } from 'react-navigation'

import Logo from './Logo'
import Login from '../Login'
import Home from '../Home'
import Splash from '../SplashScreen'
import James from '../James'
import theme from '../theme'

import type { Store } from '../flowtypes'

export const Main = StackNavigator({
  Splash: {
    screen: Splash,
    path: 'splash'
  },
  Onboarding: {
    screen: Login,
    path: 'onboarding/:mode',
  },
  James: {
    screen: James,
    path: 'james'
  },
  Home: {
    screen: Home,
    path: 'home',
  },
}, {
  headerMode: 'float',
  navigationOptions: (params) => {
    return {
      headerLeft: <Logo dark={!params.screenProps.darkHeader}/>,
      headerStyle: {
        elevation: 0,
        backgroundColor: params.screenProps.headerColor || theme.base.primary,
        height: 80,
      }
    }
  }
})

class MainNavigator extends PureComponent<*> {

  static lightPages = {
    ONBOARDING: true
  }
  navKey = 'mainStack'

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
  }

  handleBackPress = () => {
    const { dispatch, mainStack } = this.props
    if (mainStack.index - 1 >= 0) {
      dispatch({type: NavigationActions.BACK, navKey: this.navKey})
      return true
    }

    return false
  }

  render () {
    const { mainStack, navType, dispatch, darkHeader, } = this.props
    return (
      <Main
        screenProps={{navType, darkHeader}}
        navigation={addNavigationHelpers({
          navKey: this.navKey,
          dispatch,
          state: mainStack,
        })}
      />
    )
  }
}

const mapStateToProps = ({ mainStack, location } : Store) : * =>
  ({
    mainStack,
    navType: location.type,
    navPayload: location.payload,
    darkHeader: !MainNavigator.lightPages[location.type],
  })

const ConnectedMainNavigator = connect(mapStateToProps)(MainNavigator)

export {
  ConnectedMainNavigator
}
