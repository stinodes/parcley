// @flow
import * as React from 'react'
import {createTabBarButton, createTabBarIcon} from '../TabBar/index'
import {Screen} from 'nativesystem'
import {Separator} from 'nativesystem/src/Components/Separator'
import {CreateMatchForm} from './CreateMatchForm'
import {ScrollView, Animated} from 'react-native'
import {JoinMatchForm} from './JoinMatchForm'

type Props = {}

class NewMatch extends React.Component<Props> {
  render() {
    return (
      <Screen
        f={1} color="white"
        statusBarColor="white"
        statusBarStyle="dark-content">
        <ScrollView
          style={{flex: 1}} contentContainerStyle={{flexGrow: 1}}>
          <JoinMatchForm/>
            <Separator color="gainsBoro"/>
          <CreateMatchForm/>
        </ScrollView>
      </Screen>
    )
  }
}

export {NewMatch}
