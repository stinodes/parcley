// @flow
import type {ThemeProps} from '../types'

const properties = {
  w: 'width',
  h: 'height',
}
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
          [sizeStyleProp(key)]: props[key],
        }
      },
      {},
    )
  return styles
}
