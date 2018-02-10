// @flow
import React from 'react'
import {StyleSheet} from 'react-native'
import glamorous, {withTheme} from 'glamorous-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import {colorFromTheme} from '../helpers'
import {Text} from '../Text'
import {Base} from '../Buttons'

import type {ComponentType, Node} from 'react'
import type {Color, Theme} from '../types'

const {View} = glamorous

const styleAsRow = (component) => glamorous(component)({
  flexDirection: 'row',
  backgroundColor: 'white',
}, ({theme, withTopBorder}) => {
  const borderStyle = {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.misc.separatorColor,
  }
  if (withTopBorder)
    return {
      ...borderStyle,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: theme.misc.separatorColor,
    }
  return borderStyle
})
const StyledRowButton = styleAsRow(Base)
const StyledRow = styleAsRow(View)

type Props = {
  smallPadding?: boolean,
  children: Node,
  first?: boolean,
  onPress?: () => any,
  rightIcon?: string,
  rightColor?: Color,
  rightText?: string,
  rightRender?: () => Node,

  theme: Theme,
}

const RowComponent: ComponentType<Props> =
  ({theme, onPress, children, smallPadding, first, rightIcon, rightText, rightRender, rightColor}: Props) => {

    const renderedRow = (
      <View paddingHorizontal={16} flexDirection="row" alignItems="center" justifyContent="space-between" flex={1}>
        <View paddingVertical={smallPadding ? 4 : 12} flex={1}>
          {children}
        </View>
        <View flexDirection="row" alignItems="center">
          {rightRender && rightRender()}
          {rightText &&
          <Text
            faded
            color={rightColor && colorFromTheme(theme, {color: rightColor})}>
            {rightText}
          </Text>
          }
          {rightIcon &&
          <Icon
            name={rightIcon}
            size={28}
            color={rightColor ?
              colorFromTheme(theme, {color: rightColor})
              : theme.textColors.faded
            }/>
          }
        </View>
      </View>
    )

    if (onPress)
      return (
        <StyledRowButton
          withTopBorder={first}
          onPress={onPress}
          background={Base.Ripple(theme.base.primary, false)}>
          {renderedRow}
        </StyledRowButton>
      )
    return (
      <StyledRow withTopBorder={first}>
        {renderedRow}
      </StyledRow>
    )
  }

const Row = withTheme(RowComponent)

export {Row}
