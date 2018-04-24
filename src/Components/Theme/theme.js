// @flow
import type { ThemeColors, Theme } from './types'

const baseWidth = 375
const desWidth = 1080
const ratio = baseWidth / desWidth

const colors: ThemeColors = {
  white: '#fcfcff',
  
  ufoGreen: '#1ece62',
  frenchSky: '#7692ff',
  gunMetal: '#2d3047',
  
  black: '#000000',
  raisinBlack: '#212121',
  arsenic: '#424242',
  sonicSilver: '#757575',
  
  fallback: '#2d3047',
}
const theme: Theme = {
  colors,
  ratio,
  spacing: [
    0, 20 * ratio, 40 * ratio, 80 * ratio,
  ],
  text: {
    // sizes: 48, 58
    // weights: medium, bold
    color: colors.black,
    fontFamily: 'Montserrat Medium',
    fontSize: 48 * ratio,
    large: {
      fontSize: 58 * ratio,
      fontFamily: 'Montserrat Bold',
    }
  },
  button: {
    backgroundColor: colors.ufoGreen,
    height: 160 * ratio,
    paddingHorizontal: 80 * ratio,
    borderRadius: 80 * ratio,
  }
}

export { theme }
