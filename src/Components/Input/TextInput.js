// @flow
import React, {PureComponent} from 'react'
import g from 'glamorous-native'
import {TextInput as RNTextInput} from 'react-native'

import {WithThemeFAC} from '../WithThemeFAC'

import type {ComponentType, Node} from 'react'
import type {TextColorProps, TextSizeProps} from '../types'
import {textColor, textSize, textStyle} from '../Theme/system'

const GTextInput = g(RNTextInput)(
  textSize,
  textColor,
  textStyle,
)

type EventHandlers = {
  onBlur?: () => any,
  onFocus?: () => any,
  onChangeText: (string) => any,
}
export type InputProps = {
  value: string,
  placeholder?: string,
  placeholderTextColor?: string,
  underlineColorAndroid?: string,
  secureTextEntry?: boolean,
  keyboardType?: string,
  inputRef?: (?RNTextInput) => any,
}
type Props =
  & InputProps
  & EventHandlers
  & TextColorProps
  & TextSizeProps

class WrappedRNTextInput extends PureComponent<Props> {
  textInput: RNTextInput
  focus() {
   this.textInput.focus()
  }
  blur() {
   this.textInput.blur()
  }
  render() {
    const {underlineColorAndroid, inputRef, ...props} = this.props
    return (
      <GTextInput
        {...props}
        innerRef={inputRef}
        underlineColorAndroid={underlineColorAndroid || 'transparent'}/>
    )
  }
}

export {WrappedRNTextInput, WrappedRNTextInput as TextInput, RNTextInput}
export type {Props as TextInputProps}
