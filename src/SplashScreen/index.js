// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Screen } from '../Components'
import { actions as firebaseActions } from '../Firebase/Redux'

import type { Store } from '../flowtypes'

type OwnProps = {
}

type MappedProps = {
}

class SplashScreen extends Component<ReduxProps<OwnProps, MappedProps>> {
  componentDidMount() {
    this.props.dispatch(firebaseActions.initFirebase())
      // .then(
      //   user => !user && this.props.dispatch({type: 'ONBOARDING', payload: { mode: 'login' }})
      // )
  }
  render() {
    return (
      <Screen/>
    )
  }
}

const mapStateToProps = (state : Store, ownProps : OwnProps) : MappedProps => {
  return {}
}

export default connect(mapStateToProps)(SplashScreen)
