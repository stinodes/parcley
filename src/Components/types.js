// @flow
export type Color = string
export type BaseColors = 'primary' | 'secondary' | 'tertiary'
export type Sizes = 'small' | 'medium' | 'large' | 'xlarge'
export type TextSizes = 'xsmall'| Sizes | 'title'

export type ThemeColors = {
  [name: string]: Color,
}
export type ThemeBaseColors = {
  [base: BaseColors]: Color
}

export type ThemeErrorColors = {
  light: Color,
  dark: Color,
}
export type ThemeTextSize = {
  fontSize: number,
  fontWeight: string,
  lineHeight: number,
}
export type TextColorTheme = {
  dark: Color,
  light: Color,
  faded: Color,
}
export type TextSizeTheme = {
  [size: TextSizes]: ThemeTextSize,
}

export type ThemeButtonSize = {
  text: TextSizes,
  height: number,
}
export type ThemeButtonColor = {
  text: Color,
  ripple: Color,
}
export type ButtonSizeTheme = {
  [size: Sizes]: ThemeButtonSize,
  floating: {
    icon: number,
    size: number,
  }
}
export type ButtonColorTheme = {
  [base: BaseColors]: ThemeButtonColor,
}

export type InputTheme = {}
export type MiscTheme = {
  separatorColor: Color,
  buttonRadius: number,
  cardRadius: number,
}
export type Theme = {
  colors: ThemeColors,
  base: ThemeBaseColors,
  spacingUnit: number,
  errors: ThemeErrorColors,
  textColors: TextColorTheme,
  textSizes: TextSizeTheme,
}

export type SizeProps = {
  medium?: boolean,
  large?: boolean,
  xlarge?: boolean,
}
export type ColorProps = {
  primary?: boolean,
  secondary?: boolean,
  tertiary?: boolean,
  color?: Color,
}
export type TextColorProps = {
  dark?: boolean,
  light?: boolean,
  faded?: boolean,
  color?: Color,
  error?: boolean|'light'|'dark',
}
export type TextSizeProps = {
  ...SizeProps,
  title?: boolean,
}
export type RaisedProps = {
  raised?: boolean|number,
}
export type FlexProps = {
  flex?: number,
  alignItems?: string,
  alignSelf?: string,
  justifyContent?: string,
}