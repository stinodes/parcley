// @flow
import * as React from 'react'
import g from 'glamorous-native'

import {Base} from './Base'
import {Text} from '../Text'
import type {TextColorProps, TextSizeProps} from '../types'
import type {ButtonBaseProps} from './Base'
import {flex, size, space} from '../helpers'

const GBase = g(Base)(
  flex,
  size,
  space,
)

const TextButton = ({dark, light, faded, medium, large, title, color, children, ...props}: ButtonBaseProps&TextColorProps&TextSizeProps) => {
  const textProps = {
    dark,
    light,
    faded,
    medium,
    large,
    title,
    color
  }
  return (
    <GBase {...props} noContainer background={Base.Ripple('yellowGreen', true)}>
      <Text {...textProps}>
        {children}
      </Text>
    </GBase>
  )
}
TextButton.Ripple = Base.Ripple

export {TextButton}
