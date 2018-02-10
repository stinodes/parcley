// @flow
import React, {Component} from 'react'
import {Animated} from 'react-native'
import {withTheme, View} from 'glamorous-native'
import {Text} from '../Text'
import type {Theme} from '../types'

type Props = {
  light?: boolean,
  dark?: boolean,
  children: string,
  
  theme: Theme,
}

class InputErrorComponent extends Component<Props> {
  transitionChildren: ?string
  animation = new Animated.Value(0)
  
  componentWillReceiveProps(newProps) {
    if (newProps.children && !this.props.children)
      this.transitionChildren = newProps.children
  }
  componentDidUpdate(oldProps) {
    if (this.props.children && !oldProps.children)
      this.animate(1)
    else if (!this.props.children && oldProps.children)
      this.animate(0)
  }
  
  animate(val: number) {
    Animated.spring(
      this.animation,
      {toValue: val},
    ).start()
  }
  
  get message() {
    return this.props.children || this.transitionChildren
  }
  render() {
    const {children, theme, light, dark, ...props} = this.props
    const animation = this.animation
    const textProps = {
      ...props,
      dark: !dark && !light ? true : dark,
      light: light,
    }
    return (
      <View marginTop={8} height={theme.textSizes.small.lineHeight}>
        <Animated.View style={{
          overflow: 'hidden',
          backgroundColor: 'transparent',
          height: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, theme.textSizes.small.lineHeight],
            extrapolateLeft: 'clamp',
          })
        }}>
            <Text small error {...textProps}>{this.message}</Text>
        </Animated.View>
      </View>
    )
  }
}

const InputError = withTheme(InputErrorComponent)
export {InputError}
