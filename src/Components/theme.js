// @flow
import type { ThemeColors, ThemeBaseColors, Theme } from './types'

const colors: ThemeColors = {
  white: '#FFF',

  greenCyan: '#1B996A',
  lightGreenCyan: '#22BF7F',
  darkGreenCyan: '#15724C',
  
  white: '#F3F2FF',
  magnolia: '#F3F2FF',
  soap: '#D6CDF4',
  blackCoral: '#606175',
  davysGrey: '#514E56',
  
  lightPink: '#FF7D77',
  darkPink: '#BF5A62',
}
const base: ThemeBaseColors = {
  primary: colors.greenCyan,
  secondary: colors.soap,
  tertiary: colors.blackCoral,
}
const theme: Theme = {
  colors,
  base,

  textColors: {
    dark: colors.davysGrey,
    light: colors.magnolia,
    faded: colors.blackCoral,
  },
  errors: {
    light: colors.lightPink,
    dark: colors.darkPink,
  },
  textSizes: {
    title: {
      fontSize: 24,
      lineHeight: 26,
    },
    xlarge: {
      fontSize: 20,
      lineHeight: 24,
    },
    large: {
      fontSize: 18,
      lineHeight: 22,
    },
    medium: {
      fontSize: 16,
      lineHeight: 20,
    },
    small: {
      fontSize: 14,
      lineHeight: 18,
    },
  },

  buttonSizes: {
    small: {
      text: 'medium',
      height: 45,
    },
    medium: {
      text: 'large',
      height: 60,
    },
    large: {
      text: 'xlarge',
      height: 70,
    },
    xlarge: {
      text: 'xlarge',
      height: 70,
    },

    floating: {
      icon: 30,
      size: 80,
    },
  },
  buttonColors: {
    primary: {
      text: colors.magnolia,
      ripple: colors.darkGreenCyan,
    },
    secondary: {
      text: colors.davysGrey,
      ripple: colors.blackCoral,
    },
    tertiary: {
      text: colors.magnolia,
      ripple: colors.soap,
    },
  },

  input: {
    small: {
      fontSize: 16,
      lineHeight: 20,
    },
    medium: {
      fontSize: 18,
      lineHeight: 22,
    },
    large: {
      fontSize: 20,
      lineHeight: 24,
    },
  },

  misc: {
    separatorColor: colors.lightGreenCyan,
    cardRadius: 5,
  }
}

export { theme }
