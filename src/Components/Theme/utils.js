// @flow
import type {BaseSubTheme, Color, Modifier, Theme} from './types'
import {Platform} from 'react-native'

const getIn = (obj: {[any]: any}, key: any) => obj[key]

const getComponentTheme = (theme: Theme, subThemeName: string) => getIn(theme, subThemeName)
const getSubTheme = (theme: Theme, subThemeName: string, modifierKey: ?Modifier = 'default') =>
  getIn(
    getComponentTheme(theme, subThemeName),
    modifierKey,
  )

const mergeSubThemeObjects = (subTheme1: BaseSubTheme = {}, subTheme2: BaseSubTheme = {}) =>
  ({...subTheme1, ...subTheme2})

const subThemeWithModifier = (theme: Theme, subThemeName: string, modifierName: ?Modifier) =>
  mergeSubThemeObjects(
    getSubTheme(theme, subThemeName),
    getSubTheme(theme, subThemeName, modifierName),
  )

const elevationStyle = (elevation: number) => {
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
const elevationStyleFromRaised = (raised: ?boolean|number) => {
  if (raised === true)
    return elevationStyle(3)
  else if (raised)
    return elevationStyle(raised)
  return {}
}
const getColor = (theme: Theme, color: ?Color, defaultColor?: Color) =>
  (color && theme.colors[color] || color) || defaultColor && getColor(theme, defaultColor)

const getSpacing = (theme: Theme, spacing: ?number) =>
  typeof spacing === 'number' ?
    (spacing >= 0 && spacing < 4 ? theme.spacing[spacing] : spacing) :
    null

export {
  getIn,
  getComponentTheme,
  getSubTheme,
  mergeSubThemeObjects,
  subThemeWithModifier,
  elevationStyleFromRaised,
  getColor,
  getSpacing,
}
