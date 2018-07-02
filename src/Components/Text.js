// @flow
import * as React from 'react'
import g from 'glamorous-native'
import {Text as _Text} from 'nativesystem'
import {fontFamilyForWeight} from './fonts'

const boldToFontFamily = ({bold, ...props}: {bold: boolean}) => ({
  fontFamily: fontFamilyForWeight(bold ? '700' : '500')
})
const Text = g(_Text)(boldToFontFamily, {fontWeight: 'normal'})
export { Text }