// @flow
import React from 'react'
import { Touchable, TouchableNativeFeedback, View } from 'react-native'

export type ButtonBaseProps = {
  background? : TouchableNativeFeedback.propTypes.background,
  noContainer? : boolean,
} & Touchable.propTypes

const ButtonBase = ({style, containerStyle, noContainer, children, ...props} : ButtonBaseProps) => {
  const button = (
    <TouchableNativeFeedback {...props}>
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

ButtonBase.SelectableBackground = TouchableNativeFeedback.SelectableBackground
ButtonBase.SelectableBackgroundBorderless = TouchableNativeFeedback.SelectableBackgroundBorderless
ButtonBase.Ripple = TouchableNativeFeedback.Ripple
ButtonBase.delayHandler = (handler: (any) => any) =>
  (...args: any) => setTimeout(() => handler(...args), 50)

export const Base = ButtonBase
