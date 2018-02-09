// @flow
import React from 'react'
import {withTheme} from 'glamorous-native'
import {ActivityIndicator} from 'react-native'

import type {ColorProps, Theme} from './index'
import {colorFromTheme} from './helpers'

type Props = &ColorProps
  &{small?: boolean, large?: boolean}
  &{theme: Theme}
  

const SpinnerComponent = ({theme, ...props}: Props) => {
  const color = colorFromTheme(theme, props)
  const size = props.small ? 'small' : 'large'
  return <ActivityIndicator color={color} size={size}/>
}

const Spinner = withTheme(SpinnerComponent)
export {Spinner}