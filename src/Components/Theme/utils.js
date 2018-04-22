// @flow
import type {Color, Modifier, SubTheme, Theme} from './types'
import {Platform} from 'react-native'

const getIn = <T>(obj: {[string]: T}, key: string): T => obj[key]

const subTheme = (theme: Theme, subThemeName: string) =>
  theme[subThemeName]
const subThemeMod = (theme: Theme, subThemeName: string, modifierName: Modifier) =>
  getIn(
    subTheme(theme, subThemeName),
    `_${modifierName}`,
  )

const mergeSubThemeObjects = (subTheme1: SubTheme, subTheme2: SubTheme) => ({...subTheme1, subTheme2})

const subThemeWithModifier = (theme: Theme, subThemeName: string, modifierName: Modifier) =>
  mergeSubThemeObjects(
    subTheme(theme, subThemeName),
    subThemeMod(theme, subThemeName, modifierName),
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


const getColor = (theme: Theme, color: Color) => theme.colors[color] || color
const getSpacing = (theme: Theme, spacing: number) =>
  spacing >= 0 && spacing < 4 ? theme.spacing[spacing] : spacing

export {
  getIn,
  subTheme,
  subThemeMod,
  mergeSubThemeObjects,
  subThemeWithModifier,
  elevationStyleFromRaised,
  getColor,
  getSpacing,
}
