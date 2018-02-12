// @flow
import React, {PureComponent} from 'react'

import {TextInput, WrappedRNTextInput} from './TextInput'

import type {TextColorProps, TextSizeProps} from '../types'
import type {InputProps} from './TextInput'

type EventHandlers = {
  onBlur?: () => any,
  onFocus?: () => any,
  onChangeText?: (string) => any,
}
export type FormikProps = {
  onTouched?: (name: string) => any,
  onChange: (name: string, value: string) => any,
  name: string,
}

type Props = & FormikProps
  & EventHandlers
  & InputProps
  & TextColorProps
  & TextSizeProps

class FTextInput extends PureComponent<Props> {
  
  input: WrappedRNTextInput
  
  onChangeText = (value: string) => {
    this.props.onChange(this.props.name, value)
    this.props.onChangeText && this.props.onChangeText(value)
  }
  focus(){
    this.input.focus()
  }
  blur(){
    this.input.blur()
  }
  _onBlur = () => {
    this.props.onTouched && this.props.onTouched(this.props.name)
    this.props.onBlur && this.props.onBlur()
  }

  render() {
    const {name, onChange, onChangeText, inputRef, ...props} = this.props
    return (
      <TextInput
        {...props}
        onBlur={this._onBlur}
        inputRef={inputRef}
        onChangeText={this.onChangeText}/>
    )
  }
}

export {FTextInput}
export type {Props as FTextInputProps}
