// @flow
import * as React from 'react'

import {Button, Logo, SystemView as View, Text} from '../Components'

type Props = {}

class Playground extends React.Component<Props> {
  render() {
    return (
      <View flex={1} jc="space-around" p={3} backgroundColor="white" ai="center">
        <Logo size={200}/>
        <View w={250}>
          <View py={8}>
            <Button
              raised={25} color="ufoGreen"
              onPress={() => {}}>
              <Text modifier="large" color="white">Log In</Text>
            </Button>
          </View>
          <View py={8}>
            <Button
              raised={25} color="frenchSky"
              onPress={() => {}}>
              <Text modifier="large" color="white">Sign Up</Text>
            </Button>
          </View>
        </View>

      </View>
    )
  }
}

// 40
// 1080

// 40 -> 14

// 14
// 375

export {Playground}
