// @flow
import React from 'react'
import glamorous from 'glamorous-native'

import { textColorFromTheme, textSizeFromTheme } from './helpers'

import type { Node } from 'react'
import type { ComponentType } from 'react'
import type { TextSizeProps, TextColorProps } from './types'

export type Props = TextSizeProps & TextColorProps & {
  align?: 'center'|'right'|'left',
  bold?: boolean,
  children?: Node,
}
const Text: ComponentType<Props> = glamorous.text({}, ({theme, ...props}) => {
  return {
    color: textColorFromTheme(theme, props),
    ...textSizeFromTheme(theme, props),
    textAlign: props.align || 'left',
    fontWeight: props.bold ? 'bold' : 'normal',
  }
})

export { Text }
