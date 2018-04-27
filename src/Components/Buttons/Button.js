// @flow
import * as React from 'react'
import g, {withTheme} from 'glamorous-native'

import {Base} from './Base'
import {backgroundColor, flex, raised, subTheme} from '../Theme/system'
const GButton = g(Base)(
  flex,
  subTheme('button'),
  backgroundColor,
  {elevation: 0}
)
import type {ColorProps, ModProps, RaisedProps, ThemeProps} from '../Theme'

import {getColor} from '../Theme'

type Props = ModProps&ColorProps&ThemeProps&RaisedProps&{}

class Button extends React.Component<Props> {
  render() {
    const {theme, rippleColor, ...props} = this.props
    const buttonTheme = subTheme('button')(this.props)
    const background = Base.Ripple(getColor(theme, rippleColor)||'', true)
    const raisedStyle = raised(this.props)
    return (
      <GButton
        jc="center" ai="center"
        background={background}
        containerStyle={{
          borderRadius: buttonTheme.borderRadius,
          ...raisedStyle,
        }}
        {...this.props}/>
    )
  }
}
const ThemedButton = withTheme(Button)

export {ThemedButton as Button}
