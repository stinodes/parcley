// @flow
import React, {PureComponent} from 'react'
import {StatusBar, Keyboard, TouchableWithoutFeedback} from 'react-native'
import glamorous, {withTheme} from 'glamorous-native'

import {colorFromTheme} from '../helpers'
import {DismissArea} from './DismissArea'

import type {ColorProps, Theme} from '../types'
import type {ComponentType, Node, Ref} from 'react'

type ScreenProps = {
  dismissKeyboardOnTap?: boolean,
  ignoredTargets?: () => Ref<*>[],
  statusBarColor?: string,
  statusBarStyle?: 'light-content'|'dark-content',
  statusBarTranslucent? : boolean,
  children: Node,
}
type LayoutProps = {
  justifyContent: string,
  alignItems: string,
}
type Props = ColorProps&ScreenProps&LayoutProps

const StyledScreen = glamorous.view({
  flex: 1,
}, ({theme, justifyContent, alignItems, ...props}) => ({
  justifyContent,
  alignItems,
  backgroundColor: colorFromTheme(theme, props)  || theme.colors.white,
}))
const DismissableScreen = glamorous(DismissArea)({
  flex: 1,
}, ({theme, justifyContent, alignItems, ...props}) => ({
  justifyContent,
  alignItems,
  backgroundColor: colorFromTheme(theme, props) || theme.colors.white,
}))

class ScreenComponent extends PureComponent<Props&{theme: Theme}> {

  render() {
    const {
      theme, dismissKeyboardOnTap, ignoredTargets, children, ...props
    } = this.props
    const statusBar = <StatusBar backgroundColor={theme.colors.white} barStyle="dark-content"/>

    if (dismissKeyboardOnTap)
      return (
        <DismissableScreen
          {...props}
          ignoredTargets={ignoredTargets}>
          {statusBar}
          {children}
        </DismissableScreen>
      )
    return (
  
      <StyledScreen
        {...props}>
        {statusBar}
        {children}
      </StyledScreen>
    )
  }
}

const Screen = withTheme(ScreenComponent)

export {Screen}
