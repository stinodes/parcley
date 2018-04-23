// @flow
import React from 'react'
import glamorous from 'glamorous-native'

import {textColor, textSize, textStyle} from './Theme'

const Text = glamorous.text(
  {fontFamily: 'Montserrat Medium'},
  textColor,
  textSize,
  textStyle,
)

export { Text }
