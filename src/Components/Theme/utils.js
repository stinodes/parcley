// @flow
import type {Color, Modifier, SubTheme, Theme} from './types'

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

const getColor = (theme: Theme, color: Color) => theme.colors[color] || color
const getSpacing = (theme: Theme, spacing: number) =>
  spacing >= 0 && spacing < 4 ? theme.spacing[spacing] : spacing
