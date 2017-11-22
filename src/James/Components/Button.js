// @flow
import React from 'react'
import { View } from 'react-native'
import glamorous from 'glamorous-native'
import { shade, tint } from 'polished'

import ButtonBase from '../../Components/Button/Base'

import type { Node } from 'react'

const { Text } = glamorous

const colors = {
  blue: '#337ab7',
  red: '#d9534f',
  tealish: '#5bc0de',
}
const StyledButtonWrapper = glamorous(ButtonBase)({
  paddingVertical: 12,
  paddingHorizontal: 16,
  borderRadius: 4,
}, (props) => {
  if (props.blue)
    return {backgroundColor: colors.blue}
  else if (props.red)
    return {backgroundColor: colors.red}
  else
    return {backgroundColor: colors.tealish}
})

type ButtonProps = {
  blue? : boolean,
  red? : boolean,
  tealish? : boolean,
  children : Node,
}

const Button = (props : ButtonProps) => {
  const color = (props.blue && colors.blue) || (props.red && colors.red) || (colors.tealish)

  return (
    <StyledButtonWrapper
      {...props}
      background={ButtonBase.SelectableBackground()}>
      <View>
        <Text
          fontSize={14}>
          {props.children}
        </Text>
      </View>
    </StyledButtonWrapper>
  )
}

export default Button
