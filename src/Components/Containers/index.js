// @flow
import React from 'react'
import glamorous, { withTheme } from 'glamorous-native'

import LinearGradient from '../ThemedGradient'

import type { ThemeProps } from 'glamorous-native'

const { View } = glamorous
const Gradient = glamorous(LinearGradient)({
  borderRadius: 12,
}, (props : Props) => ({
  elevation: props.elevation ? 3 : 0,
}))

type Props = {
  dark?: boolean,
  light?: boolean,
  elevation?: boolean,
  theme: ThemeProps,
  children: Node,
}

const Container = ({elevation, theme, ...props} : Props) => {
  return (
    <Gradient
      elevation={elevation}

      start={{x: 1, y: 0}}
      end={{x: 0, y: 0}}>
      <View {...props}/>
    </Gradient>
  )
}

export default withTheme(Container)
