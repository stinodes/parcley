// @flow
import * as React from 'react'

import type {InputProps} from './TextInput'

export type EnhancedHandlers = {|
  onChange: (name: string, value: string) => any,
  onChangeText?: (value: string) => any,
  onBlur?: () => any,
  onFocus?: () => any,
  name: string,
|}

type OutputProps = InputProps&EnhancedHandlers
const FormikInputWrapper = (TextInputComponent: React.ComponentType<InputProps>) => {
  return ({onChange, onChangeText, name, ...props}: OutputProps) => (
    <TextInputComponent
      {...props}
      onChangeText={
        (value: string) => {
          onChange(name, value)
          typeof onChangeText === 'function' && onChangeText(value)
        }
      }/>
  )
}

export {FormikInputWrapper}
