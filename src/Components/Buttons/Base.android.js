// @flow
import React from 'react'
import { Touchable, TouchableNativeFeedback, View } from 'react-native'
import {withTheme} from 'glamorous-native'
import type {ColorProps} from '../types'
import {colorFromProps, colorFromTheme, colorPropsFromString} from '../helpers'

type Ripple = {
  color: string,
  borderless: ?boolean,
}
export type ButtonBaseProps = {
  background? : Ripple,
  noContainer? : boolean,
} & Touchable.propTypes

const ButtonBase = ({theme, style, containerStyle, noContainer, children, background = ripple('yellowGreen', true), ...props} : ButtonBaseProps) => {
  const button = (
    <TouchableNativeFeedback {...props} background={parseRipple(background, theme)}>
      <View style={style}>
        {children}
      </View>
    </TouchableNativeFeedback>
  )

  if (noContainer)
    return button
  return (
    <View style={containerStyle}>
      {button}
    </View>
  )
}

const ripple = (color: string, borderless?: boolean): Ripple => ({
  color,
  borderless,
})
const parseRipple = (ripple: Ripple, theme: Theme) =>
  TouchableNativeFeedback.Ripple(
    colorFromProps({theme, [ripple.color]: true}),
    ripple.borderless,
  )

const Base = withTheme(ButtonBase)
Base.SelectableBackground = TouchableNativeFeedback.SelectableBackground
Base.SelectableBackgroundBorderless = TouchableNativeFeedback.SelectableBackgroundBorderless
Base.Ripple = ripple
Base.delayHandler = (handler: (any) => any) =>
  (...args: any) => setTimeout(() => handler(...args), 50)

export {Base}
