// @flow
import {fontFamilyForWeight} from '../../fonts'
import {getColor} from '../utils'
import type {ColorProps, ModProps, ThemeProps} from '../types'
import {subTheme} from './theme'

const styleProperties: { [string]: string } = {
  weight: 'fontWeight',
  align: 'textAlign',
}


const isTextStyleProp = (key) => !!styleProperties[key]
const textStyleProp = (key) => styleProperties[key]

export const textTheme = subTheme('text')
export const textColor = ({theme, color}: ThemeProps&ColorProps) =>
  ({color: getColor(theme, color)})

export const text = (props: ThemeProps&ColorProps&ModProps) => ({
  ...textTheme(props),
  ...textColor(props),
})
