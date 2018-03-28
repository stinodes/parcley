// @flow
import * as React from 'react'
import g from 'glamorous-native'
import {Animated, Dimensions, View as RNView} from 'react-native'

import {flex, QuestionInput, Screen, Separator, size, space, SystemView as View, Text, TextButton} from '../Components'
import {KeyboardAnimationProvider} from '../Components/Keyboard'
import {QuestionForm} from '../Components/Input/QuestionForm'

const AnimatedView = g(Animated.View)(
  size,
  space,
  flex,
)

type Interpolation = {
  inputRange: number[],
  outputRange: number[],
  easing?: any,
  extrapolate?: any,
  extrapolateLeft?: any,
  extrapolateRight?: any,
}
type Mode = 'login' | 'register' | null
type Props = {}
type State = {
  selected: Mode,
  loginAnimation: Animated.Value,
  registerAnimation: Animated.Value,
  formY: ?number,
}

class Playground extends React.Component<Props, State> {
  
  state = {
    selected: null,
    loginAnimation: new Animated.Value(0),
    registerAnimation: new Animated.Value(0),
    formY: null,
  }
  
  static LOGIN = 'login'
  static REGISTER = 'register'
  static NONE = null
  formPositionView: ?RNView
  
  componentDidUpdate(oldProps: Props, oldState: State) {
    const {selected: oldSelected} = oldState
    const {selected} = this.state
    if (oldSelected !== selected) {
      this.animate(selected)
    }
  }
  
  onFormPositionLayout = () => {
    this.formPositionView && this.formPositionView.measureInWindow((x, y) => {
      this.setState({
        formY: y,
      })
    })
  }
  
  loginPress = () => this.state.selected === Playground.LOGIN ?
    this.setState({selected: Playground.NONE}) :
    this.setState({selected: Playground.LOGIN})
  registerPress = () => this.state.selected === Playground.REGISTER ?
    this.setState({selected: Playground.NONE}) :
    this.setState({selected: Playground.REGISTER})
  
  animationsForMode(mode: Mode) {
    const {loginAnimation, registerAnimation} = this.state
    switch (mode) {
      case Playground.LOGIN:
        return [
          Animated.spring(loginAnimation, {toValue: 0, useNativeDriver: true}),
          Animated.spring(registerAnimation, {toValue: 1, useNativeDriver: true}),
        ]
      case Playground.REGISTER:
        return [
          Animated.spring(loginAnimation, {toValue: 1, useNativeDriver: true}),
          Animated.spring(registerAnimation, {toValue: 0, useNativeDriver: true}),
        ]
      default:
        return [
          Animated.spring(loginAnimation, {toValue: 0, useNativeDriver: true}),
          Animated.spring(registerAnimation, {toValue: 0, useNativeDriver: true}),
        ]
      
    }
  }
  
  animate(mode: Mode) {
    Animated.parallel(
      this.animationsForMode(mode),
    ).start()
  }
  
  driver = (value: Animated.Value) => ({opacity, x, y, scale,}: { opacity?: Interpolation, x?: Interpolation, y?: Interpolation, scale?: Interpolation }) =>
    ({
      opacity: opacity && value.interpolate(opacity),
      transform: [
        x ? {translateX: value.interpolate(x)} : undefined,
        y ? {translateY: value.interpolate(y)} : undefined,
        scale ? {scale: value.interpolate(scale)} : undefined
      ].filter(prop => !!prop)
    })
  
  render() {
    const {loginAnimation, registerAnimation} = this.state
    const {width, height} = Dimensions.get('window')
    // $FlowFixMe
    const loginDriver = this.driver(Animated.add(loginAnimation, Animated.multiply(registerAnimation, -1)))
    // $FlowFixMe
    const registerDriver = this.driver(Animated.add(registerAnimation, Animated.multiply(loginAnimation, -1)))
    return (
      <KeyboardAnimationProvider useNativeDriver forceAndroid>
        {(kbp) => {
          const standardKeyboardAnimation = Animated.divide(kbp.animation, kbp.keyboardHeight || 1)
          // $FlowFixMe
          const registerFormAnimation = Animated.add(standardKeyboardAnimation, registerAnimation)
          // $FlowFixMe
          const loginFormAnimation = Animated.add(standardKeyboardAnimation, loginAnimation)
          const registerFormDriver = this.driver(registerFormAnimation)
          const loginFormDriver = this.driver(loginFormAnimation)
          return (
            <Screen
              dismissKeyboardOnTap>
              <View px={4} py={2} f={1}>
                <View h={3} w={3} my={2}>
                  {/*<IconButton color="black" size={36} name="md-arrow-round-back"/>*/}
                </View>
                <View pb={8}>
                  <Text title dark>
                    Coolio
                  </Text>
                </View>
                <AnimatedView
                  // $FlowFixMe
                  style={this.driver(Animated.add(loginAnimation, registerAnimation))({
                    y: {inputRange: [0, 1], outputRange: [0, -80]},
                  })}>
                  <View pb={3}>
                    <View pb={2}>
                      <Text large>
                        Hello there!
                      </Text>
                    </View>
                    <View pb={1}>
                      <Text>
                        You will need to log in to make use of the app.
                      </Text>
                    </View>
                    <View>
                      <Text>
                        Do you have an account already?
                      </Text>
                    </View>
                  </View>
                  <Separator color="darkPuce" thickness={1} w={3}/>
                  
                  <View my={2} fd="row" jc="space-between">
                    <AnimatedView
                      my={1} jc="center"
                      style={loginDriver({
                        opacity: {inputRange: [0, 1], outputRange: [1, 0]},
                        x: {inputRange: [-1, -0.2, 0], outputRange: [100, 0, 0]},
                        y: {inputRange: [0, 0.2, 1], outputRange: [0, 0, 50]},
                      })}>
                      <TextButton
                        onPress={TextButton.delayHandler(this.loginPress)}
                        weight="700" yellowGreen>
                        Yes, log in
                      </TextButton>
                    </AnimatedView>
                    <AnimatedView
                      my={1} jc="center"
                      style={registerDriver({
                        opacity: {inputRange: [0, 1], outputRange: [1, 0]},
                        x: {inputRange: [-1, -0.2, 0], outputRange: [-100, 0, 0]},
                        y: {inputRange: [0, 0.2, 1], outputRange: [0, 0, 50]},
                      })}>
                      <TextButton
                        onPress={TextButton.delayHandler(this.registerPress)}
                        weight="700" yellowGreen>
                        No, sign up
                      </TextButton>
                    </AnimatedView>
                  </View>
                </AnimatedView>
                <RNView ref={comp => this.formPositionView = comp} onLayout={this.onFormPositionLayout}/>
                {this.state.formY &&
                <QuestionForm animationDriver={registerFormDriver({
                  y: {inputRange: [0, 1, 2], outputRange: [height, this.state.formY - 100, 0]},
                })}>
                  <QuestionForm.Question name="username" eerieBlack large weight="700" question="My username is..."/>
                  <QuestionForm.Question name="password" eerieBlack large weight="700" question="My password is..."/>
                </QuestionForm>
                }
                {this.state.formY &&
                <QuestionForm animationDriver={loginFormDriver({
                  y: {inputRange: [0, 1, 2], outputRange: [height, this.state.formY - 100, 0]},
                })}>
                  <QuestionForm.Question eerieBlack large weight="700" question="My username is..."/>
                  <QuestionForm.Question eerieBlack large weight="700" question="My password is..."/>
                </QuestionForm>
                }
              </View>
            </Screen>
          )
        }}
      </KeyboardAnimationProvider>
    )
  }
}

// 40
// 1080

// 40 -> 14

// 14
// 375

export {Playground}
