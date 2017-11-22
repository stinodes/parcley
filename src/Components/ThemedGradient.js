// @flow
import React from 'react'
import { withTheme } from 'glamorous-native'
import LinearGradient from 'react-native-linear-gradient'

import type { ThemeProps } from 'glamorous-native'

type Coords = { x: number, y: number }
type Props = {
  dark?: boolean,
  light?: boolean,
  colors?: Array<string>,
  start?: Coords,
  end?: Coords,
  style? : any,
  theme: ThemeProps,
}

const ThemedGradient = ({dark, light, theme, ...props} : Props) => {
  const colorPrefix = (dark && 'dark') || (light && 'light') || 'light'
  const gradient = [theme.buttons[`${colorPrefix}-gradient-start`], theme.buttons[`${colorPrefix}-gradient-end`]]
  return (
    <LinearGradient colors={gradient} {...props}/>
  )
}

export default withTheme(ThemedGradient)
