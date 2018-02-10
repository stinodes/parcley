// @flow
import React from 'react'
import {ThemeProvider} from 'glamorous-native'
import {Provider} from 'react-redux'
import {createReduxStore} from './src/Store'
import {RootNavigator} from './src/Navigation'
import {theme} from './src/Components'

const store = createReduxStore()
export default () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <RootNavigator/>
    </ThemeProvider>
  </Provider>
)
