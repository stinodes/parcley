// @flow
import * as React from 'react'
import g from 'glamorous-native'

import {Base} from './Base'
import {Text} from '../Text'
import {flex, size, space} from '../helpers'
import type {TextColorProps, TextSizeProps} from '../types'
import type {ButtonBaseProps} from './Base'

const GBase = g(Base)(
  flex,
  size,
  space,
)

const TextButton = ({children, onPress, ...props}: ButtonBaseProps&TextColorProps&TextSizeProps) => {
  return (
    <GBase {...props} onPress={onPress} noContainer background={Base.Ripple('yellowGreen', true)}>
      <Text {...props}>
        {children}
      </Text>
    </GBase>
  )
}
TextButton.Ripple = Base.Ripple
TextButton.delayHandler = Base.delayHandler

export {TextButton}
