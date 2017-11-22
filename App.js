import React from 'react'
import { View, StyleSheet, Platform, } from 'react-native'
import { Provider } from 'react-redux'
import configureStore from './src/store'
import createHistory from 'history/createMemoryHistory'
import { ThemeProvider } from 'glamorous-native'

import { ConnectedMainNavigator } from './src/Navigation'
import theme from './src/theme'
import initializeFirebase from './src/Firebase'

const url = 'bardown://splash'
// const url = '://james'

const delimiter = /*config(env).URI_PREFIX ||*/ '://'
const initialPath = url ? `/${url.split(delimiter)[1]}` : '/'
const history = createHistory({ initialEntries: [initialPath] })
const store = configureStore(history)
initializeFirebase()

const styles = StyleSheet.create({
    app: {
        flex: 1,
    }
})

export default ((store) => () => (
    <View style={styles.app}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <ConnectedMainNavigator/>
        </ThemeProvider>
      </Provider>
    </View>
))(store)
