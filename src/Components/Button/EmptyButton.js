// @flow
import React from 'react'
import { StyleSheet } from 'react-native'
import glamorous, { withTheme } from 'glamorous-native'
import { transparentize } from 'polished'

import Text from '../Text'
import Base from './Base'

const StyledBase = glamorous(Base)({
  paddingVertical: 8,
})

type Props = {
  light? : boolean,
  dark? : boolean,
  muted? : boolean,

  align? : string,
  children : Node,
  onPress : (any) => any,
  theme : Object,
}

const EmptyButton = ({children, theme, align, ...props} : Props) => {
  let color = theme.buttons.darkEmpty.text
  if (props.light)
    color = theme.buttons.lightEmpty.text
  else if (props.muted)
    color = theme.buttons.mutedEmpty.text

  return (
    <StyledBase background={Base.Ripple(transparentize(0.7, color), true)} noContainer {...props}>
      <Text
        large
        color={color}
        align={align || 'center'}>
        {children}
      </Text>
    </StyledBase>
  )
}

export default withTheme(EmptyButton)
