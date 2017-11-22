// @flow
import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import glamorous, { withTheme } from 'glamorous-native'
import LinearGradient from 'react-native-linear-gradient'
import { transparentize, tint, saturate, shade, desaturate } from 'polished'

import Text from '../Text'
import Base from './Base'

import type { ThemeProps } from 'glamorous-native'

const StyledBase = glamorous(Base)({
  alignItems: 'center',
  justifyContent: 'center',
  height: 60,
})
const containerStyle = StyleSheet.create({
  container: {
    borderRadius: 30,
  }
})
const Gradient = glamorous(LinearGradient)({
  borderRadius: 30,
  elevation: 2,
})
const ButtonText = glamorous.text({
  fontSize: 20,
  fontWeight: 'bold',
}, ({theme, light, dark}) => ({
    ...theme.text.shadow,

  color: light ?
    theme.buttons['light-text-color'] :
    theme.buttons['dark-text-color'],

  textShadowColor: transparentize(light ? 0.8 : 0.2, theme.colors['black-blue']),
}))

type Props = {
  primary? : boolean,
  secondary? : boolean,
  tertiary? : boolean,

  children: Node,
  onPress: (any) => any,
  theme: ThemeProps,
}

class StyledButton extends Component<Props> {

  get buttonTheme() {
    const { theme, primary, secondary, tertiary } = this.props
    if (primary)
      return theme.buttons.primary
    if (secondary)
      return theme.buttons.secondary
    if (tertiary)
      return theme.buttons.tertiary
    return theme.buttons.primary
  }
  get gradient() {
    const color = this.buttonTheme.color
    return [tint(0.8, color), color]
  }
  get textColor() {
    return this.buttonTheme.text
  }

  render() {
    const { theme, children, ...props } = this.props
    const rippleColor = transparentize(0.7, this.textColor)
    return (
      <Gradient
        start={{x: 1, y: 0}}
        end={{x: 0, y: 0}}
        colors={this.gradient}>
        <StyledBase
          containerStyle={containerStyle.container}
          background={Base.Ripple(rippleColor, true)}
          {...props}>
          <Text
            xlarge
            shadow
            bold
            color={this.textColor}>
            {children}
          </Text>
        </StyledBase>
      </Gradient>
    )
  }
}

export default withTheme(StyledButton)
