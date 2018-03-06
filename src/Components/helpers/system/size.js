// @flow
import type {Theme} from '../../types'
import {fromUnit} from '../theme'

const properties = {
  w: 'width',
  h: 'height',
}
type ThemeProps = {theme: Theme}
type SizeProps = {
  w?: number,
  h?: number,
}

const isSizeProp = (key) => !!properties[key]
const sizeStyleProp = (key) => properties[key]
export const size = ({theme, ...props}: SizeProps&ThemeProps) => {
  const styles = Object
    .keys(props)
    .reduce(
      (prev, key) => {
        if (!isSizeProp(key))
          return prev
        return {
          ...prev,
          [sizeStyleProp(key)]: fromUnit(theme, props[key])
        }
      },
      {},
    )
  return styles
}
