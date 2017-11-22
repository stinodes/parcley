// @flow
import React, { Component } from 'react'
import glamorous from 'glamorous-native'

import Button from './Components/Button'

const { View } = glamorous

class James extends Component<*> {
  render() {
    return (
      <View
        flex={1}>

        <View
          flexDirection="row"
          justifyContent="space-between">
          <Button blue>
            Wassup
          </Button>
          <Button red>
            Wassup
          </Button>
          <Button>
            Wassup
          </Button>
        </View>

      </View>
    )
  }
}

export default James
