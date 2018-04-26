// @flow
export type Color = string
export type Modifier = 'default'|'large'|'small'

export type ThemeColors = {
  [name: string]: Color,
}

export type ThemeModifiers<ThemeType> = { [?Modifier]: ThemeType, }
export type BaseTextTheme = {
  color?: Color,
  fontSize?: number,
  fontWeight?: number,
  lineHeight?: number,
  fontFamily?: string,
}
export type TextTheme = {
  ...ThemeModifiers<BaseTextTheme>,
}
export type BaseButtonTheme = {
  backgroundColor?: Color,
  rippleColor?: Color,
  height?: number,
  paddingHorizontal?: number,
  paddingVertical?: number,
  borderRadius?: number,
  elevation?: number,
}
export type ButtonTheme = {
  ...ThemeModifiers<BaseButtonTheme>,
}

export type SubTheme = ButtonTheme|TextTheme
export type BaseSubTheme = BaseButtonTheme|BaseTextTheme

export type Theme = {
  colors: ThemeColors,
  spacing: number[],
  text: TextTheme,
  button: ButtonTheme,
}


export type ColorProps = { color?: ?Color }
export type ModProps = { modifier?: ?Modifier }
export type RaisedProps = { raised?: ?number }
export type ThemeProps = { theme: Theme }
export type SizeProps = { w?: number, h?: number, }
export type SpaceProps = {
  p?: number,
  px?: number,
  py?: number,
  pt?: number,
  pr?: number,
  pb?: number,
  pl?: number,
}
export type FlexProps = {
  jc?: 'center'|'flex-start'|'flex-end'|'space-between'|'space-around',
  ai?: 'center'|'flex-start'|'flex-end'|'stretch',
  ai?: 'center'|'flex-start'|'flex-end'|'stretch',
  fd?: 'row'|'column',
  f?: number,
}