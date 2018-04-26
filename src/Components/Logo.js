// @flow
import * as React from 'react'
import g from 'glamorous-native'

import {size} from './Theme'
import LOGO from '../../assets/ic_launcher.png'

const Image = g.image(
  size,
)

type Props = {
  size: number,
}

const Logo = ({size}: Props) => (
  <Image w={size} h={size} source={LOGO}/>
)

export {Logo}
