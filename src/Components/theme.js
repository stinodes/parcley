// @flow
import type { ThemeColors, ThemeBaseColors, Theme } from './types'

const colors: ThemeColors = {
  white: '#fcfcff',
  
  eerieBlack: '#191616',
  darkPuce: '#483d3f',
  
  yellowGreen: '#80C921',
  
  lightPink: '#FF7D77',
  darkPink: '#BF5A62',
}
const base: ThemeBaseColors = {
  primary: colors.white,
  secondary: colors.eerieBlack,
  tertiary: colors.yellowGreen,
}
const theme: Theme = {
  colors,
  base,

  spacingUnit: 14,
  space: [14, 14 * 2, 14 * 3, 14 * 4],
  
  textColors: {
    dark: colors.eerieBlack,
    faded: colors.darkPuce,
    light: colors.white,
  },
  errors: {
    light: colors.lightPink,
    dark: colors.darkPink,
  },
  textSizes: {
    title: {
      fontSize: 60,
      fontWeight: '700',
      lineHeight: 64,
    },
    xlarge: {
      fontSize: 30,
      fontWeight: '600',
      lineHeight: 32,
    },
    large: {
      fontSize: 22,
      fontWeight: '500',
      lineHeight: 24,
    },
    medium: {
      fontSize: 15,
      fontWeight: '500',
      lineHeight: 18,
    },
  },
}

export { theme }
