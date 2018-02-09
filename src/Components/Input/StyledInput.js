// @flow
import React from 'react'
import {View} from 'glamorous-native'
import {TextInput as RNTextInput} from 'react-native'

import type {Node} from 'react'
import {Separator} from '../Separator'
import {InputError} from './InputError'
import {FTextInput} from './FTextInput'
import {TextInput} from './TextInput'
import type {FTextInputProps} from './FTextInput'
import type {TextInputProps} from './TextInput'

type Props = {
  errorMessage?: ?string,
  separatorColor?: string,
  useErrorColor?: boolean,
  children: Node,
}

const InputWrapper = ({errorMessage, useErrorColor, separatorColor, children}: Props) => {
  let separatorProps = {}
  if (useErrorColor && !!errorMessage) separatorProps = {color: 'darkPink'}
  else if (separatorColor === 'primary') separatorProps = {primary: true}
  else if (separatorColor === 'secondary') separatorProps = {secondary: true}
  else if (separatorColor === 'tertiary') separatorProps = {tertiary: true}
  else separatorProps = {color: separatorColor}
  
  return (
    <View flexDirection="column" justifyContent="center">
      {children}
      <Separator thickness={1} {...separatorProps}/>
      <InputError>{errorMessage}</InputError>
    </View>
  )
}

type StyledTextInputProps = &TextInputProps&{
  errorMessage?: ?string,
  separatorColor?: string,
  useErrorColor?: boolean,
  inputRef?: (?RNTextInput) => any,
}
const StyledTextInput = ({inputRef, separatorColor, useErrorColor, errorMessage, value, onChangeText, ...props}: StyledTextInputProps) => (
  <InputWrapper seperatorColor={separatorColor} useErrorColor={useErrorColor} errorMessage={errorMessage}>
    <TextInput {...props} innerRef={inputRef} error={useErrorColor && !!errorMessage} value={value} onChangeText={onChangeText}/>
  </InputWrapper>
)

type FStyledTextInputProps = FTextInputProps&{
  errorMessage?: ?string,
  separatorColor?: string,
  useErrorColor?: boolean,
  inputRef?: (?RNTextInput) => any,
}
const FStyledTextInput = ({inputRef, separatorColor, useErrorColor, errorMessage, value, onChange, name, ...props}: FStyledTextInputProps) => (
  <InputWrapper seperatorColor={separatorColor} useErrorColor={useErrorColor} errorMessage={errorMessage}>
    <FTextInput {...props} ref={inputRef} error={useErrorColor && !!errorMessage} value={value} onChange={onChange} name={name}/>
  </InputWrapper>
)

export {InputWrapper, FStyledTextInput, StyledTextInput}