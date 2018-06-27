// @flow
import React from 'react'
import {Dimensions, Animated} from 'react-native'
import {ThemeProvider} from 'glamorous-native'
import {Provider} from 'react-redux'
import {Font} from 'expo'
import type {Theme} from 'nativesystem'
import {createTheme, Screen, Spinner, SystemView as View} from 'nativesystem'

import {createReduxStore} from './src/Store'
import {AppNavigator} from './src/Navigation'
import {fonts, Logo} from './src/Components'
import {delay} from './src/Utils'

const store = createReduxStore()

type Props = {}
type State = {
  logoAnimation: Animated.Value,
  spinnerAnimation: Animated.Value,
  theme: Theme,
  loaded: boolean,
}

class App extends React.Component<Props, State> {
  constructor(...args: any) {
    super(...args)
    
    const theme = createTheme()
      .useDefault()
      .done()
    
    this.state = {
      logoAnimation: new Animated.Value(0),
      spinnerAnimation: new Animated.Value(0),
      theme,
      loaded: false,
    }
  }
  
  async componentDidMount() {
    this.animate(1)
    await Promise.all([
      delay(2000),
      Font.loadAsync(fonts),
    ])
    this.animate(2,
      () => this.setState({loaded: true})
    )
  }
  
  animate = (toValue: number, callback?: () => any) => {
    const {logoAnimation, spinnerAnimation} = this.state
    Animated.stagger(200, [
      Animated.spring(
        logoAnimation,
        {toValue, useNativeDriver: true},
      ),
      Animated.spring(
        spinnerAnimation,
        {toValue, useNativeDriver: true},
      ),
    ]).start(callback)
  }
  
  render() {
    const {theme, logoAnimation, spinnerAnimation,} = this.state
    const {height} = Dimensions.get('window')
    const inputRange = [0, 1, 2]
    const outputRange = [height, 0, -height]
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          {this.state.loaded ?
            <AppNavigator/> :
            <Screen
              f={1} jc="space-around" ai="center"
              color="white" statusBarColor="white" statusBarStyle="dark-content">
              <Animated.View
                style={{
                  transform: [{translateY: logoAnimation.interpolate({inputRange, outputRange})}]
                }}>
                <Logo size={120}/>
              </Animated.View>
              <Animated.View
                style={{
                  transform: [{translateY: spinnerAnimation.interpolate({inputRange, outputRange})}]
                }}>
                <Spinner color="ufoGreen" size="large"/>
              </Animated.View>
            </Screen>
          }
        </ThemeProvider>
      </Provider>
    )
  }
}

export default App
