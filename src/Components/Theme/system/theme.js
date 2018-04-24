// @flow
import {elevationStyleFromRaised, getColor, subThemeWithModifier} from '../utils'
import type {ColorProps, ModProps, RaisedProps, ThemeProps} from '../types'

export const subTheme = (subTheme: string) => ({theme, modifier}: ThemeProps&ModProps) =>
  subThemeWithModifier(theme, subTheme, modifier)
export const backgroundColor = ({theme, color}: ThemeProps&ColorProps) => ({backgroundColor: getColor(theme, color)})
export const raised = ({theme, raised}: ThemeProps&RaisedProps) => ({...elevationStyleFromRaised(raised)})
