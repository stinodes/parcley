// @flow
import React from 'react'
import glamorous from 'glamorous-native'
import { transparentize } from 'polished'

const Title = glamorous.text({
  fontWeight: 'bold',
  backgroundColor: 'transparent',
}, ({theme, color, dark, large, medium, small, align}) => {
  let textColor
  let size

  if (theme.colors[color]) textColor = theme.colors[color]
  else if (dark) textColor = theme.text['dark-header']
  else textColor = theme.text['light-header']

  if (large) size = theme.text['title-large']
  else if (medium) size = theme.text['title-medium']
  else if (small) size = theme.text['title-small']
  else size = theme.text['title-medium']

  return {
    ...theme.text.shadow,
    color: textColor,
    textAlign: align,
    textShadowColor: transparentize(dark ? 0.7 : 0.2, theme.colors['black-blue']),
    ...size,
  }
})


type Props = {
  color? : string,
  dark? : boolean,
  light? : boolean,
  large? : boolean,
  medium? : boolean,
  small? : boolean,
  align? : string,
}

export default (props : Props) => <Title {...props}/>
