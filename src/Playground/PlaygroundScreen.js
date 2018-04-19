// @flow
import * as React from 'react'
import { Dimensions } from 'react-native'

import {Screen, } from '../Components'

type Props = {}

class Playground extends React.Component<Props> {
  render() {
    console.warn(Dimensions.get('window'))
    return (
      null
    )
  }
}

// 40
// 1080

// 40 -> 14

// 14
// 375

export {Playground}
