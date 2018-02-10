// @flow
import glamorous from 'glamorous-native'

import {elevationStyleFromRaised, colorFromTheme} from '../helpers'

import type {ComponentType} from 'react'
import type {ColorProps, FlexProps, RaisedProps} from '../types'

type CardProps = {
  radius?: number,
}
type Props = ColorProps&RaisedProps&FlexProps&CardProps

const Card: ComponentType<Props> = glamorous.view(
  {},
  ({theme, ...props, flex, alignItems, radius, alignSelf, justifyContent}) => {
  return {
    ...elevationStyleFromRaised(props),
    backgroundColor: colorFromTheme(theme, props),
    flex, alignItems, alignSelf, justifyContent,
    borderRadius: typeof radius === 'number' ? radius : theme.misc.cardRadius,
  }
})

export { Card }
export type {Props as CardProps}
