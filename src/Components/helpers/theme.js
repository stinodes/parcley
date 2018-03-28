// @flow
import { Platform } from 'react-native'

import type {Theme, ColorProps, TextSizeProps, SizeProps, TextColorProps, RaisedProps} from '../types'
import {fontFamilyForWeight} from '../fonts'

const colorPropNames: Array<$Keys<ColorProps>> = ['primary', 'secondary', 'tertiary', 'color',]
const sizePropNames: Array<$Keys<SizeProps>> = ['medium', 'large', 'xlarge']
const textColorPropNames: Array<$Keys<TextColorProps>> = ['dark', 'light', 'faded', 'color',]
const textSizePropNames: Array<$Keys<TextSizeProps>> = [...sizePropNames, 'title']
  
export const elevationStyle = (elevation: number) => {
  if (Platform.OS === 'android')
    return {
      elevation,
    }
  return {
    shadowOpacity: 0.0015 * elevation + 0.18,
    shadowRadius: 0.54 * elevation,
    shadowOffset: {
      height: 0.6 * elevation,
      width: 0,
    },
  }
}
export const elevationStyleFromRaised = ({raised}: RaisedProps) => {
  if (raised === true)
    return elevationStyle(3)
  else if (raised)
    return elevationStyle(raised)
  return {}
}
export const fromUnit = (theme: Theme, amount: ?number) =>
  amount !== undefined && amount !== null ?
    theme.spacingUnit * amount :
    undefined


export const themeColor = ({theme, color}: {theme: Theme, color: string}) => theme.colors[color] || color
export const colorFromProps = ({theme, color, ...props}: {theme: Theme, color?: string, [string]: boolean}) => {
  if (!!color)
    return themeColor({theme, color})
  return Object.keys(props)
    .reduce((prev, key) => {
      if (!!theme.colors[key] && !!props[key])
        return theme.colors[key]
      if (!!theme.base[key] && !!props[key])
        return theme.base[key]
      return prev
    }, undefined)
}
export const colorFromTheme = (theme: Theme, props: ColorProps) => {
  console.warn('"colorFromTheme" deprecated, phase out onegaishimasu')
  return colorFromProps({theme, ...props})
  
}

// export const buttonColorFromTheme = (theme: Theme, {primary, secondary, tertiary}: ColorProps) => {
//   if (primary) return theme.buttonColors.primary
//   if (secondary) return theme.buttonColors.secondary
//   if (tertiary) return theme.buttonColors.tertiary
//   return theme.buttonColors.primary
// }
// export const buttonSizeFromTheme = (theme: Theme, {small, medium, large, xlarge}: SizeProps) => {
//   if (small) return theme.buttonSizes.small
//   if (medium) return theme.buttonSizes.medium
//   if (large) return theme.buttonSizes.large
//   if (xlarge) return theme.buttonSizes.xlarge
//   return theme.buttonSizes.medium
// }

