// @flow
import type {Theme} from '../../types'
import {colorFromProps, themeColor} from '../theme'
import {fontFamilyForWeight} from '../../fonts'

const styleProperties: { [string]: string } = {
  weight: 'fontWeight',
  align: 'textAlign',
}
export type TextColorProps = {
  [string]: boolean,
  color?: string,
}
export type TextSizeProps = {
  [string]: boolean,
  size: number,
}

export type TextStyleProps = {
  weight?: string,
  align?: string,
}
type ThemeProps = { theme: Theme }

const isTextStyleProp = (key) => !!styleProperties[key]
const textStyleProp = (key) => styleProperties[key]

export const textColor = (props: ThemeProps & TextColorProps) =>
  ({color: colorFromProps(props)})
export const textSize = ({theme, size, ...props}: ThemeProps & TextSizeProps) => {
  if (size)
    return {fontSize: size, lineHeight: size+2}
    
  const styles = Object.keys(props)
    .reduce((prev, key) => {
      if (!!theme.textSizes[key] && !!props[key])
        return theme.textSizes[key]
      return prev
    }, theme.textSizes.medium)
  return {...styles, fontWeight: undefined, fontFamily: fontFamilyForWeight(styles.fontWeight)}
}
export const textStyle = ({theme, ...props}: ThemeProps & TextStyleProps) => {
  return Object.keys(props)
    .reduce((prev, key) => {
      if (!isTextStyleProp(key))
        return prev
      if (key === 'weight') {
        return {...prev, fontFamily: fontFamilyForWeight(props[key])}
      }
      return {...prev, [textStyleProp(key)]: props[key]}
    }, {})
}
export const text = (props: ThemeProps & TextColorProps & TextSizeProps & TextStyleProps) => ({
  ...textColor(props),
  ...textSize(props),
  ...textStyle(props),
})
