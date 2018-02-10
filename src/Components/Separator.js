// @flow
import React from 'react'
import {StyleSheet} from 'react-native'
import glamorous, {View} from 'glamorous-native'
import {colorFromTheme} from './helpers'

import type {ComponentType} from 'react'
import type {ColorProps} from './types'

type Props = ColorProps & {
  vertical?: boolean,
  horizontal?: boolean,
  thickness?: void | number,
}

const Separator: ComponentType<Props> = glamorous.view(
  {},
  ({theme, ...props}) => ({
    backgroundColor: colorFromTheme(theme, props) || theme.base.primary,
    [props.vertical ? 'width' : 'height']: typeof props.thickness === 'number' ? props.thickness : StyleSheet.hairlineWidth,
    alignSelf: 'stretch',
  })
)

export {Separator}
