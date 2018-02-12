// @flow
import * as React from 'react'
import {Dimensions, ImageBackground} from 'react-native'
import glamorous from 'glamorous-native'
import {transparentize} from 'polished'

import type {ColorProps} from '../types'
import {colorFromTheme} from '../helpers'

const Image = glamorous(ImageBackground)({
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
})
const Overlay = glamorous.view(({theme, ...props}) => ({
  flex: 1,
  backgroundColor: transparentize(
    typeof props.overlayTransparency === 'number' ?
      props.overlayTransparency :
      0.1,
    colorFromTheme(theme, props) || theme.colors.magnolia
  )
}))

type Props = ColorProps&{
  source: any,
  children: React.Node,
  overlayTransparency?: number,
}
const BackgroundImage = ({source, children, ...props}: Props) => (
  <Image source={source}>
    <Overlay {...props}>
      {children}
    </Overlay>
  </Image>
)

export {BackgroundImage}
