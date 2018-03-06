// @flow
import { Platform } from 'react-native'

import type {Theme, ColorProps, TextSizeProps, SizeProps, TextColorProps, RaisedProps} from '../types'
import {fontFamilyForWeight} from '../fonts'

const colorPropNames: Array<$Keys<ColorProps>> = ['primary', 'secondary', 'tertiary', 'color',]
const sizePropNames: Array<$Keys<SizeProps>> = ['medium', 'large']
const textColorPropNames: Array<$Keys<TextColorProps>> = ['dark', 'light', 'faded', 'color',]
const textSizePropNames: Array<$Keys<TextSizeProps>> = [...sizePropNames, 'title']

export const colorPropsFromString = (str: string) =>
  colorPropNames.some(v => v === str) ?
    {[str]: true} :
    {color: str}
  
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

export const extractColorProps = (props: { [_: string]: any } & ColorProps): ColorProps => {
  return colorPropNames
    .filter(key => props[key] !== undefined)
    .reduce((prev, key) => ({...prev, [key]: props[key]}), {})
}
export const colorFromTheme = (theme: Theme, {primary, secondary, tertiary, color}: ColorProps) => {
  if (!!color) {
    if (theme.colors[color]) return theme.colors[color]
    return color
  }
  if (primary) {
    return theme.base.primary
  }
  if (secondary) {
    return theme.base.secondary
  }
  if (tertiary) {
    return theme.base.tertiary
  }
}

export const textColorFromTheme = (theme: Theme,  {dark, light, faded, error, color, ...props}: TextColorProps) => {
  if (!!color) {
    if (theme.colors[color]) return theme.colors[color]
    return color
  }
  if (error) {
    if (error === 'dark') return theme.errors.dark
    if (error === 'light') return theme.errors.light
    if (dark) return theme.errors.dark
    if (light) return theme.errors.light
    return theme.errors.dark
  }
  if (dark) return theme.textColors.dark
  if (light) return theme.textColors.light
  if (faded) return theme.textColors.faded
}

export const rawTextSizeFromTheme = (theme: Theme, {medium, large, title} : TextSizeProps) => {
  if (medium) return theme.textSizes.medium
  if (large) return theme.textSizes.large
  if (title) return theme.textSizes.title
  return theme.textSizes.medium
}
export const textSizeFromTheme = (theme: Theme, {medium, large, title} : TextSizeProps) => {
  const size = rawTextSizeFromTheme(theme, {medium, large, title})
  return {...size, fontWeight: undefined, fontFamily: fontFamilyForWeight(size.fontWeight)}
}
export const textInputSizeFromTheme = (theme: Theme, props: TextSizeProps) => {
  const textSize = textSizeFromTheme(theme, props)
  return {...textSize, height: textSize.fontSize * 1.3}
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

