// @flow
import * as React from 'react'
import g, {withTheme} from 'glamorous-native'

import {Base} from './Base'
import {backgroundColor, flex, raised, subTheme} from '../Theme/system'
import type {ColorProps, ModProps, RaisedProps, ThemeProps} from '../Theme'
import {getColor} from '../Theme'

const GButton = g(Base)(
  flex,
  backgroundColor,
  subTheme('button'),
  {elevation: 0}
)

type Props = ModProps&ColorProps&ThemeProps&RaisedProps&{}

class Button extends React.Component<Props> {
  render() {
    const {theme, color, ...props} = this.props
    const buttonTheme = subTheme('button')(this.props)
    const background = Base.Ripple(getColor(theme, color), true)
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
