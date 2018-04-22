// @flow
import type {Theme} from '../../types'
import {fromUnit} from '../../helpers/theme'

const properties = {
  jc: 'justifyContent',
  ai: 'alignItems',
  as: 'alignSelf',
  fd: 'flexDirection',
  f: 'flex',
}
type FlexProps = {
  jc?: 'center'|'flex-start'|'flex-end'|'space-between'|'space-around',
  ai?: 'center'|'flex-start'|'flex-end'|'stretch',
  ai?: 'center'|'flex-start'|'flex-end'|'stretch',
  fd?: 'row'|'column',
  f?: number,
}
type ThemeProps = {theme: Theme}

const isFlexProp = (key) => !!properties[key]
const flexStyleProp = (key) => properties[key]
export const flex = ({theme, ...props}: FlexProps&ThemeProps) => {
  const styles = Object
    .keys(props)
    .reduce(
      (prev, key) => {
        if (!isFlexProp(key))
          return prev
        return {
          ...prev,
          [flexStyleProp(key)]: props[key],
        }
      },
      {},
    )
  return styles
}


