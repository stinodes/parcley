// @flow
import React from 'react'
import {withTheme} from 'glamorous-native'

import type {Node} from 'react'
import type {Theme} from './Theme'

type Props = {
  children: ({theme: Theme} => Node),
  theme: Theme,
}

const WithThemeFAC = withTheme(({children, theme}: Props) => children({theme}))
export {WithThemeFAC}
