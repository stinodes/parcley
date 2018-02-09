// @flow
import React, {PureComponent} from 'react'
import {connect} from 'react-redux'

import type {Store} from '../Store'

type MappedProps = {}
type LoginScreenProps = ReduxProps<{}, MappedProps>

class LoginScreen extends PureComponent<LoginScreenProps> {
  render() {
    return (
      null
    )
  }
}

const mapStateToProps = (state: Store): MappedProps => ({

})

const ConnectedLoginScreen = connect(mapStateToProps)(LoginScreen)
export {ConnectedLoginScreen as LoginScreen}
