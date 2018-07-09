// @flow
import React from 'react'
import {Dimensions, Animated, UIManager} from 'react-native'
import {ThemeProvider} from 'glamorous-native'
import {Provider} from 'react-redux'
import type {Theme} from 'nativesystem'
import {createSubTheme, createTheme, getColor, Screen, Spinner, subTheme, SystemView as View} from 'nativesystem'
import {MessageBar, MessageBarManager} from 'react-native-message-bar'

import {createReduxStore} from './src/Store'
import {AppNavigator, NavigationService} from './src/Navigation'
import {loadFonts, Logo} from './src/Components'
import {delay} from './src/Utils'
import {colors, ratio} from './colors'
import {setupFirebase} from './src/Firebase'

setupFirebase()
const store = createReduxStore()

type Props = {}
type State = {
  logoAnimation: Animated.Value,
  spinnerAnimation: Animated.Value,
  theme: Theme,
  loaded: boolean,
}

class App extends React.Component<Props, State> {
  
  messageBar: ?MessageBar
  
  constructor(...args: any) {
    super(...args)
    
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    
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
              <AppNavigator ref={NavigationService.ref}/>
              <MessageBar
                ref={this.messageBarRef}
                position="top"
                messageBarPadding={16}
                titleStyle={{...subTheme('text')({theme, modifier: 'small'}), fontFamily: 'Montserrat Bold'}}
                messageStyle={subTheme('text')({theme, modifier: 'small'})}
                stylesheetSuccess={subTheme('messageBar')({theme, modifier: 'success'})}
                stylesheetError={subTheme('messageBar')({theme, modifier: 'error'})}
                stylesheetInfo={subTheme('messageBar')({theme})}/>
            </Animated.View>:
            
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
