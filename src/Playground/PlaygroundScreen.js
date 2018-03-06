// @flow
import * as React from 'react'
import g from 'glamorous-native'
import {Screen, Separator, SystemView as View, Text} from '../Components'
import {TextButton} from '../Components/Buttons'
import {flex, space, size} from '../Components/helpers/system'

class Playground extends React.Component<{}> {
  render() {
    return (
      <Screen>
        <View f={1} px={4} py={2}>
          
          <View h={3} w={3} my={2} backgroundColor="black">
          </View>
          
          <View pb={8}>
            <Text title dark>
              Coolio
            </Text>
          </View>
          <View pb={2}>
            <Text faded>
              I already have an account?
            </Text>
          </View>
          <Separator color="darkPuce" thickness={1} w={3}/>
          <View py={2}>
            <TextButton large color="yellowGreen" as="flex-start">
              Yes, I do!
            </TextButton>
          </View>
          <View py={2}>
            <TextButton large color="yellowGreen" as="flex-start">
              No, I do not.
            </TextButton>
          </View>
          
          <View f={1}/>
          
          <View ai="flex-end">
            <TextButton color="yellowGreen">
              I’d rather be anonymous.
            </TextButton>
          </View>
        </View>
      </Screen>
    )
  }
}

// 40
// 1080

// 40 -> 14

// 14
// 375

export {Playground}
