// @flow
import React, {PureComponent} from 'react'
import {StatusBar, Keyboard, TouchableWithoutFeedback} from 'react-native'
import glamorous, {withTheme} from 'glamorous-native'

import {backgroundColor, flex} from '../Theme'
import {DismissArea} from './DismissArea'

import type {ColorProps, Theme} from '../Theme'
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

const StyledScreen = glamorous.view(
  {flex: 1,},
  flex,
  backgroundColor,
)
const DismissableScreen = glamorous(DismissArea)(
  {flex: 1,},
  flex,
  backgroundColor,
)

class Screen extends PureComponent<Props&{theme: Theme}> {

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

const ThemedScreen = withTheme(Screen)

export {ThemedScreen as Screen}
