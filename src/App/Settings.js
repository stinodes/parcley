// @flow
import * as React from 'react'
import {Button, Screen, SystemView as View} from 'nativesystem'
import {logout} from '../Onboarding/helpers'
import {Text} from '../Components'
import {connect} from 'react-redux'
import {createOrder} from './NewOrder/Redux/actions'

type Props = {

}
type MappedProps = {

}

class Settings extends React.Component<ReduxProps<Props, MappedProps>> {
  
  tryOut = async () => {
    this.props.dispatch(createOrder({
      name: 'Test Match',
      description: 'Meh, just testing stuff out',
      members: 'some username, stinodes',
      isPrivate: false,
    }))
  }
  
  render() {
    return (
      <Screen
        color="white" f={1}
        statusBarColor="white"
        statusBarStyle="dark-content">
        <View f={1}>
        </View>
        <Button color="transparent" onPress={this.tryOut}>
          <Text color="error">
            Test
          </Text>
        </Button>
        <Button color="transparent" onPress={logout}>
          <Text color="error">
            Log out
          </Text>
        </Button>
      </Screen>
    )
  }
}

const mapStateToProps = (state): MappedProps => ({

})
const ConnectedSettings = connect(mapStateToProps)(Settings)

export {ConnectedSettings as Settings}
