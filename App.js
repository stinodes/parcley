// @flow
import React from 'react'
import {ThemeProvider} from 'glamorous-native'
import {Provider} from 'react-redux'
import { Font } from 'expo'

import {createReduxStore} from './src/Store'
import {RootNavigator} from './src/Navigation'
import {fonts, theme} from './src/Components'

const store = createReduxStore()

type Props = {

}
type State = {
  loaded: boolean,
}
class App extends React.Component<Props, State> {
  state = {
    loaded: false
  }
  async componentDidMount() {
    await Font.loadAsync(fonts)
    this.setState({loaded: true})
  }
  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          {this.state.loaded &&
            <RootNavigator/>
          }
        </ThemeProvider>
      </Provider>
    )
  }
}
export default App
