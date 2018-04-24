// @flow
import type {Color, Modifier, SubTheme, Theme} from './types'
import {Platform} from 'react-native'

const getIn = (obj: {[any]: any}, key: any) => obj[key]

const getSubTheme = (theme: Theme, subThemeName: string) => getIn(theme, subThemeName)
const getSubThemeMod = (theme: Theme, subThemeName: string, modifierKey: ?Modifier) =>
  getIn(
    getSubTheme(theme, subThemeName),
    modifierKey,
  )

const mergeSubThemeObjects = (subTheme1: SubTheme = {}, subTheme2: SubTheme = {}) =>
  ({...subTheme1, ...subTheme2})

const subThemeWithModifier = (theme: Theme, subThemeName: string, modifierName: ?Modifier) =>
  mergeSubThemeObjects(
    getSubTheme(theme, subThemeName),
    getSubThemeMod(theme, subThemeName, modifierName),
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
  color ?
    theme.colors[color] || color :
    defaultColor || theme.colors.fallback
const getSpacing = (theme: Theme, spacing: ?number) =>
  spacing !== undefined && spacing !== null ?
    (spacing >= 0 && spacing < 4 ? theme.spacing[spacing] : spacing) :
    null

export {
  getIn,
  getSubTheme,
  getSubThemeMod,
  mergeSubThemeObjects,
  subThemeWithModifier,
  elevationStyleFromRaised,
  getColor,
  getSpacing,
}
