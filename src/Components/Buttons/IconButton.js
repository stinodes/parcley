// @flow
import * as React from 'react'
import g, {withTheme} from 'glamorous-native'
import { Ionicons as Icon } from '@expo/vector-icons'

import {Base} from './Base'
import {textColor} from '../helpers'
import type {ButtonBaseProps} from './Base'
import type {ColorProps} from '../types'
import {textSize} from '../Theme/system'

const GIcon = g(Icon)(
  textSize,
  textColor,
)

type Props = ButtonBaseProps&ColorProps&{
  name: string,
}

const IconButton = ({onPress, name, background, ...props}: Props) => {
  return (
    <Base {...props} onPress={onPress} background={background||Base.Ripple('eerieBlack', true)}>
      <GIcon {...props} name={name}/>
    </Base>
  )
}

export {IconButton}
