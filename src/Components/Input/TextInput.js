// @flow
import React, {PureComponent} from 'react'
import glamorous from 'glamorous-native'
import {TextInput as RNTextInput} from 'react-native'

import {textColorFromTheme, textSizeFromTheme} from '../helpers'
import {WithThemeFAC} from '../WithThemeFAC'

import type {ComponentType, Node} from 'react'
import type {TextColorProps, TextSizeProps} from '../types'

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
    const {underlineColorAndroid, placeholderTextColor, inputRef, ...props} = this.props
    return (
      <WithThemeFAC>
        {({theme}) =>
          <RNTextInput
            {...props}
            ref={inputRef}
            underlineColorAndroid={underlineColorAndroid || 'transparent'}
            placeholderTextColor={placeholderTextColor || textColorFromTheme(theme, {faded: true})}
          />
        }
      </WithThemeFAC>
    )
  }
}

const TextInput: ComponentType<Props> = glamorous(WrappedRNTextInput)(
  {
    padding: 0,
    margin: 0,
  },
  ({theme, ...props}) => ({
    color: textColorFromTheme(theme, props),
    ...textSizeFromTheme(theme, props),
    height: textSizeFromTheme(theme, props).lineHeight * 2
  }))

export {TextInput, WrappedRNTextInput, RNTextInput}
export type {Props as TextInputProps}
