// @flow
import React from 'react'
import glamorous from 'glamorous-native'
import { transparentize } from 'polished'

const Text = glamorous.text({
  backgroundColor: 'transparent',
}, ({theme, color, dark, light, xlarge, large, medium, small, align, bold, shadow, }) => {
  let textColor
  let size
  let shadowColor
  let shadowRadius

  if (theme.colors[color]) textColor = theme.colors[color]
  else if (dark) textColor = theme.text['dark-text']
  else if (light) textColor = theme.text['light-text']
  else textColor = color || theme.text['dark-text']

  if (large) size = theme.text['text-large']
  else if (xlarge) size = theme.text['text-xlarge']
  else if (medium) size = theme.text['text-medium']
  else if (small) size = theme.text['text-small']
  else size = theme.text['text-medium']

  if (dark) shadowColor = transparentize(0.85, theme.colors['black-blue'])
  else if (light) shadowColor = transparentize(0, theme.colors['black-blue'])
  else shadowColor = transparentize(0.85, theme.colors['black-blue'])

  const shadowStyle = shadow ?
    {
      ...theme.text.shadow,
      textShadowRadius: shadowRadius,
      textShadowColor: shadowColor
    } : {}

  return {
    ...shadowStyle,
    ...size,
    color: textColor,
    textAlign: align,
    fontWeight: bold ? 'bold' : 'normal',
  }
})

type Props = {
  color? : string,
  dark? : boolean,
  light? : boolean,
  xlarge? : boolean,
  large? : boolean,
  medium? : boolean,
  small? : boolean,
  bold? : boolean,
  shadow? : boolean,
  align? : string,
}

export default (props : Props) => <Text {...props}/>
