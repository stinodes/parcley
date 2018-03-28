// @flow
import React, {Component} from 'react'
import {Keyboard} from 'react-native'
import {Animated, Platform} from 'react-native'

import type {Node} from 'react'

type Params = {
  keyboardHeight: number,
  keyboardActive: boolean,
  animation: Animated.Value,
}
type Props = {
  onAnimationComplete?: () => any,
  forceAndroid?: boolean,
  userNativeDriver?: boolean,
  children: (Params) => Node,
}

type State = {
  keyboardAnimation: Animated.Value,
  keyboardHeight: number,
  keyboardActive: boolean,
}

class KeyboardAnimationProvider extends Component<Props, State> {
  state = {
    keyboardAnimation: new Animated.Value(0),
    keyboardHeight: 0,
    keyboardActive: false,
  }
  
  componentDidMount() {
    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide'
    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow'
    this.onHideSub = Keyboard.addListener(hideEvent, (event) => {
      this.setState({keyboardActive: false, keyboardHeight: (event && event.endCoordinates.height) || this.state.keyboardHeight || 0})
    })
    this.onShowSub = Keyboard.addListener(showEvent, (event) => {
      this.setState({keyboardActive: true, keyboardHeight: (event && event.endCoordinates.height) || this.state.keyboardHeight || 0})
    })
  }
  componentWillUnmount() {
    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide'
    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow'
  
    Keyboard.removeListener(hideEvent, this.onHideSub)
    Keyboard.removeListener(showEvent, this.onShowSub)
  }
  
  componentDidUpdate(oldProps: Props, oldState: State) {
    if (this.props.forceAndroid || Platform.OS === 'ios') {
      if (
        (this.state.keyboardActive && !oldState.keyboardActive) ||
        (this.state.keyboardActive && this.state.keyboardHeight !== oldState.keyboardHeight)
      ) {
        this.animate(this.state.keyboardHeight)
      }
      else if (!this.state.keyboardActive && oldState.keyboardActive) {
        this.animate(0)
      }
    }
  }
  
  animate = (toValue: number) => {
    const {useNativeDriver} = this.props
    Animated.spring(
      this.state.keyboardAnimation,
      {toValue, useNativeDriver}
    ).start(this.props.onAnimationComplete)
  }
  
  
  render() {
    const {children} = this.props
    const {keyboardHeight, keyboardActive, keyboardAnimation} = this.state
    return (
      children({
        keyboardHeight,
        keyboardActive,
        animation: keyboardAnimation,
      })
    )
  }
}

export {KeyboardAnimationProvider}
