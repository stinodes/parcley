// @flow
import React, {Component} from 'react'
import {connect} from 'react-redux'
import glamorous from 'glamorous-native'

import {Container, EmptyButton, Screen, Title, Text, ThemedGradient } from '../Components'
import {actions as loginActions} from '../Login/Redux'

import type { Store } from '../flowtypes'

import type { Dispatch } from 'redux'

const {View} = glamorous

type Props = {
  dispatch: Dispatch<*>
}
type MappedProps = {

}

class Home extends Component<ReduxProps<Props, MappedProps>> {

  logout = () => {
    this.props.dispatch(loginActions.logout())
  }

  render() {
    return (
      <Screen>

        <View padding={24} flex={1} justifyContent="space-between">

          <View justifyContent="center" alignItems="center">
            <View padding={10}>
              <EmptyButton light onPress={this.logout}>
                Log out
              </EmptyButton>
            </View>
          </View>

        </View>

      </Screen>
    )
  }
}

const mapStateToProps = (state : Store) : MappedProps => {
  return {}
}
export default connect(mapStateToProps)(Home)
