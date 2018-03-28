// @flow
import React, {Component} from 'react'
import {Animated} from 'react-native'

type Props = {
  keyboardHeight: number,
  animation: Animated.Value,
  
  inactive?: boolean,
  
  style?: any,
}

class KeyboardAnimator extends Component<Props> {
  render() {
    const {inactive, style, animation} = this.props
    
    if (inactive) return null
    console.log(animation)
    return (
      <Animated.View
        style={[style, {
          height: animation,
        }]}/>
    )
  }
}

export {KeyboardAnimator}
