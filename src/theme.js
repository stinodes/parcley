// @flow
import {transparentize} from 'polished'

const colors = {
  'neutral-light-grey': '#E7E7E7',
  'neutral-white': '#F7F7F7',

  'bluish-grey': '#C6CFDB',
  'bluish-light-grey': '#DDE0E8',
  'bluish-white': '#EDEFF7',

  'mid-blue': '#4A5A7F',
  'dark-mid-blue': '#3A4860',
  'dark-blue': '#2E3444',
  'black-blue': '#1A1F26',

  'intense-orange': '#E89D6B',
  'faded-orange': '#F1BF98',

  // green
  'may-green': '#53A548',

  // Bluish
  'black-olive': '#393E41',
  'yankees-blue': '#16303F',
  'blue-sapphire': '#2B5F7C',

  'light-gray': '#D3D0CB',

  'wintergreen-dream': '#587B7F',
  'steel-teal': '#488A91',
  'weldon-blue': '#79AAAF',

  'eerie-black': '#1E2019',
}
const base = {
  primary: colors['may-green'],
  secondary: colors['eerie-black'],
  tertiary: colors['black-olive'],
}

export default {
  colors,

  base,

  logo: {
    dark: colors['dark-blue'],
    light: colors['bluish-grey'],
  },

  text: {
    'light-header': colors['bluish-light-grey'],
    'dark-header': colors['dark-blue'],
    'dark-text': colors['dark-blue'],
    'light-text': colors['bluish-white'],
    'shadow': {
      textShadowOffset: {
        width: 0, height: 1,
      },
      textShadowRadius: 5,
    },

    'text-xlarge': {
      fontSize: 20,
      lineHeight: 24,
    },
    'text-large': {
      fontSize: 18,
      lineHeight: 22,
    },
    'text-medium': {
      fontSize: 16,
      lineHeight: 20,
    },
    'text-small': {
      fontSize: 14,
      lineHeight: 18,
    },

    'title-large': {
      fontSize: 32,
      lineHeight: 36,
    },
    'title-medium': {
      fontSize: 26,
      lineHeight: 30,
    },
    'title-small': {
      fontSize: 20,
      lineHeight: 24,
    },
  },

  buttons: {
    primary: {
      color: base.primary,
      text: colors['eerie-black'],
    },

    secondary: {
      color: base.secondary,
      text: colors['light-gray'],
    },

    tertiary: {
      color: base.tertiary,
      text: colors['light-gray'],
    },

    darkEmpty: {
      text: colors['light-gray'],
    },
    lightEmpty: {
      text: colors['eerie-black'],
    },
    mutedEmpty: {
      text: colors['black-olive'],
    },
  },

  inputs: {

    primary: {
      color: base.primary,
      placeholder: transparentize(0.6, base.primary),
    },
    secondary: {
      color: base.secondary,
      placeholder: transparentize(0.6, base.secondary),
    },
    tertiary: {
      color: base.tertiary,
      placeholder: transparentize(0.6, base.tertiary),
    },

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
}