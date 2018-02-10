// @flow
import React, {PureComponent} from 'react'
import glamorous, {withTheme} from 'glamorous-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import {elevationStyleFromRaised, buttonColorFromTheme, colorFromTheme} from '../helpers'
import {Base} from './Base'

import type {Node} from 'react'
import type {ColorProps, Theme, Color, RaisedProps} from '../types'

const CircleButton = glamorous(Base)({
  justifyContent: 'center',
  alignItems: 'center',
}, ({theme, ...props}) => {
  return {
    height: props.size,
    width: props.size,
    borderRadius: props.size * 0.5,
    backgroundColor: colorFromTheme(theme, props),
  }
})

type Props = ColorProps & RaisedProps & {
  iconColor: Color,
  onPress: (any) => any,
  size?: number,
  icon?: string,
  children?: Node,

  theme: Theme,
}

class FloatingButtonComponent extends PureComponent<Props> {
  get size() {
    const {size, theme} = this.props
    const floatingTheme = theme.buttonSizes.floating
    if (size)
      return size
    return floatingTheme.size
  }

  get iconSize() {
    const {size, theme} = this.props
    const floatingTheme = theme.buttonSizes.floating
    if (size)
      return size * (floatingTheme.icon/floatingTheme.size)
    return floatingTheme.icon
  }

  render() {
    const {theme, onPress, icon, iconColor, children, raised, ...props} = this.props
    const buttonProps = {
      ...props,
      onPress,
      size: this.size,
      containerStyle: {
        borderRadius: this.size * 0.5,
        ...elevationStyleFromRaised({raised}),
      },
      background: Base.Ripple(buttonColorFromTheme(theme, props).ripple, true)
    }
    const iconProps = {
      color: iconColor ? colorFromTheme(theme, {color: iconColor}): buttonColorFromTheme(theme, props).text,
      name: icon,
      size: this.iconSize
    }
    return (
      <CircleButton {...buttonProps}>
        {icon &&
        <Icon {...iconProps}/>
        }
        {children}
      </CircleButton>
    )
  }
}

const FloatingButton = withTheme(FloatingButtonComponent)
FloatingButton.delayHandler = Base.delayHandler

export {FloatingButton}
