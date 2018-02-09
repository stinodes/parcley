// @flow
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Animated, Platform} from 'react-native'

import type {Node} from 'react'
import {keyboardActive, keyboardHeight} from './Redux'

type Params = {
  keyboardHeight: number,
  keyboardActive: boolean,
  animation: Animated.Value,
}
type Props = {
  onAnimationComplete?: () => any,
  forceAndroid?: boolean,
  children: (Params) => Node,
}
type MappedProps = {
  keyboardHeight: number,
  keyboardActive: boolean,
}

type State = {
  keyboardAnimation: Animated.Value,
}

class KeyboardAnimationProviderComponent extends Component<ReduxProps<Props, MappedProps>, State> {
  state = {
    keyboardAnimation: new Animated.Value(0)
  }
  
  componentDidUpdate(oldProps) {
    if (this.props.forceAndroid || Platform.OS === 'ios') {
      if (
        (this.props.keyboardActive && !oldProps.keyboardActive) ||
        (this.props.keyboardActive && this.props.keyboardHeight !== oldProps.keyboardHeight)
      ) {
        this.animate(this.props.keyboardHeight)
      }
      else if (!this.props.keyboardActive && oldProps.keyboardActive) {
        this.animate(0)
      }
    }
  }
  
  animate = (toValue: number) => {
    Animated.spring(
      this.state.keyboardAnimation,
      {toValue}
    ).start(this.props.onAnimationComplete)
  }
  
  
  render() {
    const {children, keyboardHeight, keyboardActive} = this.props
    return (
      children({
        keyboardHeight,
        keyboardActive,
        animation: this.state.keyboardAnimation,
      })
    )
  }
}

const mapStateToProps = (state) => ({
  keyboardActive: keyboardActive(state),
  keyboardHeight: keyboardHeight(state),
})
const KeyboardAnimationProvider = connect(mapStateToProps)(KeyboardAnimationProviderComponent)
export {KeyboardAnimationProvider}
