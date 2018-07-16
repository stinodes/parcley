// @flow
import * as React from 'react'

type Name = string
type Ref = <CompProps>(React.Component<CompProps>) => any
type Config = {
  [Name]: {
    input: React.Component<*>,
    ref: Ref,
    focus: () => any,
    blur: () => any,
  },
  inputRef: (Name) => Ref,
  focus: (Name) => () => any,
  blur: (Name) => () => any,
  inputs: { [Name]: React.Component<*> },
}
type Props = {
  inputNames: Name[],
  children: Config => React.Node,
}

class FormHelper extends React.Component<Props> {
  inputs = {}
  
  inputRef = (name: string) => <CompProps>(component: React.Component<CompProps>) => this.inputs[name] = component
  focus = (name: string) => () => {
    this.inputs[name] && this.inputs[name].focus && this.inputs[name].focus()
  }
  blur = (name: string) => () => {
    this.inputs[name] && this.inputs[name].blur && this.inputs[name].blur()
  }
  
  render() {
    const fields = this.props.inputNames ?
      this.props.inputNames.reduce((prev, fieldName) => ({
        ...prev,
        [fieldName]: {
          input: this.inputs[fieldName],
          ref: this.inputRef(fieldName),
          focus: this.focus(fieldName),
          blur: this.blur(fieldName),
        }
      }), {}) :
      {}
    return this.props.children({
      ...fields,
      inputs: this.inputs,
      inputRef: this.inputRef,
      focus: this.focus,
      blur: this.blur,
    })
  }
}

export {FormHelper}
