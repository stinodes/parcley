// @flow
import * as React from 'react'
import {WithThemeFAC} from '../WithThemeFAC'
import {colorFromProps} from '../helpers'
import {FTextInput, } from './FTextInput'
import type {FTextInputProps} from './FTextInput'

type Props = {
  question: string
}
class QuestionInput extends React.Component<Props&FTextInputProps> {
  render() {
    const {name, onChange, inputRef, value, question, placeholder, ...props} = this.props
    return (
      <WithThemeFAC>
        {({theme}) => {
          const placeholderColor = colorFromProps({theme, ...props})
          return (
            <FTextInput
              {...props}
              placeholder={question||placeholder}
              inputRef={inputRef}
              placeholderTextColor={placeholderColor}
              value={value}
              onChange={onChange}
              name={name}/>
          )
        }}
      </WithThemeFAC>
    )
  }
}

export {QuestionInput}
