// @flow
import type {Theme} from '../../types'
import {fromUnit} from '../theme'

const properties = {
  m: 'margin',
  p: 'padding'
}
const directions = {
  t: 'Top',
  r: 'Right',
  b: 'Bottom',
  l: 'Left',
  x: 'Horizontal',
  y: 'Vertical',
}
type ThemeProps = { theme: Theme }
type SpaceProps = {
  p?: number,
  px?: number,
  py?: number,
  pt?: number,
  pr?: number,
  pb?: number,
  pl?: number,
}
const isSpaceProp = (key) => {
  if (key.length === 1)
    return !!properties[key[0]]
  else if (key.length === 2)
    return !!properties[key[0]] && !!directions[key[1]]
  return false
}
const spaceStyleProp = (key) => `${ properties[key[0]] }${ directions[key[1]] || ''}`
export const space = ({theme, ...props}: SpaceProps & ThemeProps) => {
  const styles = Object
    .keys(props)
    .reduce(
      (prev, key) => {
        if (!isSpaceProp(key))
          return prev
        return {
          ...prev,
          [spaceStyleProp(key)]: fromUnit(theme, props[key]),
        }
      },
      {},
    )
  return styles
}