// @flow
import * as React from 'react'
import g from 'glamorous-native'
import {View as RNView} from 'react-native'
import {backgroundColor, Button, Screen, SystemView as View} from 'nativesystem'
import {Logo, MorphingScreen, Text, Transition,} from '../Components'
import type {Layout} from '../Utils'
import {measure} from '../Utils'
import {LoginForm} from './LoginForm'
import {RegisterForm} from './RegisterForm'

const Background = g.view(backgroundColor, {flex: 1})

type Props = {}
type State = {
  showLogin: boolean,
  loginButtonLayout: ?Layout,
  showRegister: boolean,
  registerButtonLayout: ?Layout,
}

class LoginScreen extends React.Component<Props, State> {
  
  state = {
    showLogin: false,
    loginButtonLayout: null,
    showRegister: false,
    registerButtonLayout: null,
  }
  
  loginButtonContainer: ?RNView
  registerButtonContainer: ?RNView
  
  componentDidMount() {
    setTimeout(
      this.measureButtons,
      0,
    )
  }
  
  measureButtons = async () => {
    // this.loginButtonContainer.measure(console.warn)
    let {loginButtonLayout, registerButtonLayout} = this.state
    
    if (this.loginButtonContainer)
      loginButtonLayout = await measure(this.loginButtonContainer)
    if (this.registerButtonContainer)
      registerButtonLayout = await measure(this.registerButtonContainer)
    
    this.setState({loginButtonLayout, registerButtonLayout})
  }
  
  showLogin = () => this.setState({showLogin: true})
  showRegister = () => this.setState({showRegister: true})
  
  render() {
    return (
      <Screen
        color="white" f={1}
        statusBarColor="white" statusBarStyle="dark-content">
        
        <View ai="center" jc="center" f={0.75}>
          <Logo size={200}/>
        </View>
        
        <View f={1} jc="center" as="center" w={200}>
          <View
            my={2}>
            <RNView
              collapsable={false}
              onLayout={() => {
              }}
              ref={comp => this.loginButtonContainer = comp}>
              <Button
                color="ufoGreen" ripple="white"
                onPress={this.showLogin}>
                <Text bold color="white">
                  Log In
                </Text>
              </Button>
            </RNView>
          </View>
          <View
            my={2}>
            <RNView
              collapsable={false}
              onLayout={() => {
              }}
              ref={comp => this.registerButtonContainer = comp}>
              <Button
                color="frenchSky" ripple="white"
                onPress={this.showRegister}>
                <Text bold color="white">
                  Sign Up
                </Text>
              </Button>
            </RNView>
          </View>
        </View>
        
        <Transition mounted={this.state.showLogin && this.state.loginButtonLayout}>
          {({onEnd, mounted, originalMounted}) =>
            mounted &&
            <MorphingScreen
              onAnimationEnd={onEnd}
              expanded={originalMounted}
              morphLayout={this.state.loginButtonLayout}>
              <MorphingScreen.Collapsed>
                <View w={200}>
                  <Button color="ufoGreen" onPress={() => this.setState({showLogin: false})}>
                    <Text color="white" bold>Log In</Text>
                  </Button>
                </View>
              </MorphingScreen.Collapsed>
              
              <MorphingScreen.Expanded>
                <LoginForm close={() => this.setState({showLogin: false})}/>
              </MorphingScreen.Expanded>
            </MorphingScreen>
          }
        </Transition>
        <Transition mounted={this.state.showRegister && this.state.registerButtonLayout}>
          {({onEnd, mounted, originalMounted}) =>
            mounted &&
            <MorphingScreen
              onAnimationEnd={onEnd}
              expanded={originalMounted}
              morphLayout={this.state.registerButtonLayout}>
              <MorphingScreen.Collapsed>
                <View w={200}>
                  <Button color="frenchSky" onPress={() => this.setState({showRegister: false})}>
                    <Text color="white" bold>Sign Up</Text>
                  </Button>
                </View>
              </MorphingScreen.Collapsed>
              
              <MorphingScreen.Expanded>
                <RegisterForm close={() => this.setState({showRegister: false})}/>
              </MorphingScreen.Expanded>
            </MorphingScreen>
          }
        </Transition>
      </Screen>
    )
  }
}

export {
  LoginScreen
}
