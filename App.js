// @flow
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {Provider} from 'react-redux'
import {createReduxStore} from './src/Store'
import {RootNavigator} from './src/Navigation'

const store = createReduxStore()
export default () => (
  <Provider store={store}>
    <RootNavigator/>
  </Provider>
)
