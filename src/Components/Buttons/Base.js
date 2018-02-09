// @flow
import React from 'react'
import { Touchable, TouchableHighlight, TouchableOpacity, TouchableNativeFeedback } from 'react-native'

export type ButtonBaseProps = {
  highlight? : boolean|string,
} & Touchable.PropTypes

const ButtonBase = (props : ButtonBaseProps) => {
  const style = [props.style, props.containerStyle]
  if (props.highlight) {
    return <TouchableHighlight
      {...props}
      style={style}
      underlayColor={typeof props.highlight === 'string' ? props.highlight : undefined}/>
  }
  return (
    <TouchableOpacity
      {...props}
      style={style}/>
  )
}

ButtonBase.SelectableBackground = TouchableNativeFeedback.SelectableBackground || (() => null)
ButtonBase.SelectableBackgroundBorderless = TouchableNativeFeedback.SelectableBackgroundBorderless || (() => null)
ButtonBase.Ripple = TouchableNativeFeedback.Ripple || ((color : string, borderless : boolean) => null)
ButtonBase.delayHandler = (handler: (any) => any) => handler

export const Base = ButtonBase
