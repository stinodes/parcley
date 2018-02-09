// @flow

declare module 'Components' {
  declare export type Color = string
  declare export type BaseColors = 'primary' | 'secondary' | 'tertiary'
  declare export type Sizes = 'small' | 'medium' | 'large' | 'xlarge'
  declare export type TextSizes = Sizes | 'title'
  
  declare export type ThemeColors = {
    [name: string]: Color,
  }
  declare export type ThemeBaseColors = {
    [base: BaseColors]: Color
  }
  
  declare export type ThemeErrorColors = {
    light: Color,
    dark: Color,
  }
  declare export type ThemeTextSize = {
    fontSize: number,
    lineHeight: number,
  }
  declare export type TextColorTheme = {
    dark: Color,
    light: Color,
    faded: Color,
  }
  declare export type TextSizeTheme = {
    [size: TextSizes]: ThemeTextSize,
  }
  
  declare export type ThemeButtonSize = {
    text: TextSizes,
    height: number,
  }
  declare export type ThemeButtonColor = {
    text: Color,
    ripple: Color,
  }
  declare export type ButtonSizeTheme = {
    [size: Sizes]: ThemeButtonSize,
    floating: {
      icon: number,
      size: number,
    }
  }
  declare export type ButtonColorTheme = {
    [base: BaseColors]: ThemeButtonColor,
  }
  
  declare export type InputTheme = {}
  declare export type MiscTheme = {
    separatorColor: Color,
    cardRadius: number,
  }
  declare export type Theme = {
    colors: ThemeColors,
    base: ThemeBaseColors,
    errors: ThemeErrorColors,
    textColors: TextColorTheme,
    textSizes: TextSizeTheme,
    buttonSizes: ButtonSizeTheme,
    buttonColors: ButtonColorTheme,
    input: InputTheme,
    misc: MiscTheme,
  }
  
  declare export type SizeProps = {
    small?: boolean,
    medium?: boolean,
    large?: boolean,
    xlarge?: boolean,
  }
  declare export type ColorProps = {
    primary?: boolean,
    secondary?: boolean,
    tertiary?: boolean,
    color?: Color,
  }
  declare export type TextColorProps = {
    dark?: boolean,
    light?: boolean,
    faded?: boolean,
    color?: Color,
    error?: boolean|'light'|'dark',
  }
  declare export type TextSizeProps = {
    ...SizeProps,
    title?: boolean,
  }
  declare export type RaisedProps = {
    raised?: boolean|number,
  }
  declare export type FlexProps = {
    flex?: number,
    alignItems?: string,
    alignSelf?: string,
    justifyContent?: string,
  }
}
