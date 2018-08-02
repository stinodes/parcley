// @flow
import React from 'react'
import {Animated, Dimensions, Platform, StyleSheet, UIManager} from 'react-native'
import {ThemeProvider} from 'glamorous-native'
import {Provider} from 'react-redux'
import type {Theme} from 'nativesystem'
import {createSubTheme, createTheme, Screen, Spinner, subTheme} from 'nativesystem'
import {MessageBar, MessageBarManager} from 'react-native-message-bar'
import {Constants} from 'expo'

import {createReduxStore} from './src/Store'
import {MainNavigator, NavigationService} from './src/Navigation'
import {loadFonts, Logo} from './src/Components'
import {delay} from './src/Utils'
import {colors, ratio} from './colors'
import * as firebase from 'firebase'
import 'firebase/firestore'

const config = {
  apiKey: 'AIzaSyDIbjaed8CjPxZsJwUIxE4n3_TzFyAyWjc',
  authDomain: 'coolio-58d55.firebaseapp.com',
  databaseURL: 'https://coolio-58d55.firebaseio.com',
  projectId: 'coolio-58d55',
  storageBucket: 'coolio-58d55.appspot.com',
  messagingSenderId: '503306606752'
}
firebase.initializeApp(config)
firebase.firestore().settings({timestampsInSnapshots: true})
const store = createReduxStore()

type Props = {}
type State = {
  logoAnimation: Animated.Value,
  spinnerAnimation: Animated.Value,
  navigatorAnimation: Animated.Value,
  theme: Theme,
  loaded: boolean,
}

class App extends React.Component<Props, State> {
  
  messageBar: ?MessageBar
  
  constructor(...args: any) {
    super(...args)
    
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)
    
    const theme = createTheme()
      .useDefault()
      .withColors(colors)
      .withSpacing([0, 8, 16, 32, 64])
      .withSubTheme('text',
        createSubTheme({
          color: colors.black,
          fontFamily: 'Montserrat Medium',
          fontSize: 48 * ratio,
        })
          .withModifier('small', {fontSize: 38 * ratio})
          .withModifier('large', {fontSize: 58 * ratio})
          .done()
      )
      .withSubTheme('textInput',
        createSubTheme({
          fontSize: 48 * ratio,
          paddingHorizontal: 4,
          paddingVertical: 8,
        })
          .done()
      )
      .withSubTheme('button',
        createSubTheme({
          backgroundColor: colors.ufoGreen,
          height: 160 * ratio,
          paddingHorizontal: 80 * ratio,
          borderRadius: 80 * ratio,
        })
          .withModifier('round', {
            height: 160 * ratio,
            width: 160 * ratio,
          })
          .withModifier('tabBar', {borderRadius: 0})
          .done()
      )
      .withSubTheme('card', createSubTheme({backgroundColor: 'white', borderRadius: 24}).done())
      .withSubTheme('overlay', createSubTheme({backgroundColor: colors.white}).done())
      .withSubTheme('messageBar',
        createSubTheme({
          titleColor: colors.white,
          messageColor: colors.white,
        })
          .withModifier('success', {strokeColor: colors.ufoGreen, backgroundColor: colors.ufoGreen,})
          .withModifier('error', {strokeColor: colors.error, backgroundColor: colors.error,})
          .done()
      )
      .done()
    
    this.state = {
      logoAnimation: new Animated.Value(0),
      spinnerAnimation: new Animated.Value(0),
      navigatorAnimation: new Animated.Value(0),
      theme,
      loaded: false,
    }
  }
  
  async componentDidMount() {
    this.animate(1)
    await Promise.all([
      delay(2000),
      loadFonts(),
    ])
    this.animate(2,
      () => this.setState({loaded: true})
    )
  }
  
  componentDidUpdate(prevProps: Props, prevState: State) {
    if (!prevState.loaded && this.state.loaded)
      this.fadeInNavigator()
  }
  
  componentWillUnmount() {
    MessageBarManager.unregisterMessageBar()
  }
  
  messageBarRef = (messageBar: MessageBar) => {
    let register = !this.messageBar
    this.messageBar = messageBar
    register && MessageBarManager.registerMessageBar(this.messageBar)
  }
  
  fadeInNavigator = () =>
    Animated.timing(this.state.navigatorAnimation, {toValue: 1}).start()
  
  animate = (toValue: number, callback?: () => any) => {
    const {logoAnimation, spinnerAnimation} = this.state
    Animated.stagger(500, [
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
  
  getMessageTopInset = () => {
    if (Platform.OS === 'ios' && Constants.statusBarHeight > 40)
      return Constants.statusBarHeight
    return undefined
  }

  
  render() {
    const {theme, logoAnimation, spinnerAnimation, navigatorAnimation} = this.state
    const {height} = Dimensions.get('window')
    const inputRange = [0, 1, 2]
    const outputRange = [height, 0, -height]
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          {this.state.loaded ?
            <Animated.View
              style={{flex: 1, opacity: navigatorAnimation}}>
              <MainNavigator ref={NavigationService.ref}/>
              <MessageBar
                ref={this.messageBarRef}
                position="top"
                messageBarPadding={16}
                viewTopInset={this.getMessageTopInset()}
                titleStyle={{...subTheme('text')({theme, modifier: 'small'}), fontFamily: 'Montserrat Bold'}}
                messageStyle={subTheme('text')({theme, modifier: 'small'})}
                stylesheetSuccess={subTheme('messageBar')({theme, modifier: 'success'})}
                stylesheetError={subTheme('messageBar')({theme, modifier: 'error'})}
                stylesheetInfo={subTheme('messageBar')({theme})}/>
            </Animated.View> :
            
            <Screen
              f={1} jc="space-around" ai="center"
              color="white" statusBarColor="white" statusBarStyle="dark-content">
              <Animated.View
                style={{
                  transform: [{translateY: logoAnimation.interpolate({inputRange, outputRange})}]
                }}>
                <Logo size={200}/>
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
