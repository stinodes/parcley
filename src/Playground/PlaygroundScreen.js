// @flow
import * as React from 'react'
import { Dimensions } from 'react-native'
import {View} from 'glamorous-native'

import {Button, SystemView, Text} from '../Components'

type Props = {}

class Playground extends React.Component<Props> {
  render() {
    console.warn(Dimensions.get('window'))
    return (
      <SystemView flex={1} jc="space-around" p={3}>
      
        <Button raised={75}>
          <Text modifier="large">Click Me</Text>
        </Button>
        <Button>
          <Text>Click Me</Text>
        </Button>
        
      </SystemView>
    )
  }
}

// 40
// 1080

// 40 -> 14

// 14
// 375

export {Playground}
