// @flow
import React from 'react'
import { Touchable, TouchableHighlight, TouchableOpacity, TouchableNativeFeedback } from 'react-native'

export type ButtonBaseProps = {
  highlight? : boolean|string,
} & Touchable.PropTypes

const ButtonBase = (props : ButtonBaseProps) => {
  if (props.highlight) {
    return <TouchableHighlight {...props} underlayColor={typeof props.highlight === 'string' ? props.highlight : undefined}/>
  }
  return (
    <TouchableOpacity {...props}/>
  )
}

ButtonBase.SelectableBackground = TouchableNativeFeedback.SelectableBackground || (() => null)
ButtonBase.SelectableBackgroundBorderless = TouchableNativeFeedback.SelectableBackgroundBorderless || (() => null)
ButtonBase.Ripple = TouchableNativeFeedback.Ripple || ((color : string, borderless : boolean) => null)

export default ButtonBase
