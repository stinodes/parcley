// @flow
export type Color = string
export type Modifier = '_large'|'_small'

export type ThemeColors = {
  [name: string]: Color,
}

export type ThemeModifiers<ThemeType> = { _large?: ThemeType, }
export type BaseTextTheme = {
  color?: Color,
  fontSize?: number,
  fontWeight?: number,
  lineHeight?: number,
  fontFamily?: string,
}
export type TextTheme = ThemeModifiers<BaseTextTheme>&BaseTextTheme
export type BaseButtonTheme = {
  backgroundColor?: Color,
  rippleColor?: Color,
  height?: number,
  paddingHorizontal?: number,
  paddingVertical?: number,
  borderRadius?: number,
  elevation?: number,
}
export type ButtonTheme = ThemeModifiers<BaseButtonTheme>&BaseButtonTheme

export type SubTheme = ButtonTheme|TextTheme
export type BaseSubTheme = BaseButtonTheme|BaseTextTheme

export type Theme = {
  colors: ThemeColors,
  spacing: number[],
  text: TextTheme,
  button: ButtonTheme,
}

export type FlexProps = {
  flex?: number,
  alignItems?: string,
  alignSelf?: string,
  justifyContent?: string,
}