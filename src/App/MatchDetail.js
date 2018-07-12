// @flow
import * as React from 'react'
import {connect} from 'react-redux'
import {match} from './Redux/selectors'

import type {Match} from 'coolio'

type Props = {

}
type MappedProps = {
  match: Match
}

class MatchDetail extends React.Component<Props> {
  render() {
    return null
  }
}

const mapStateToProps = (state, ownProps): MappedProps => ({
  match: match(state, ownProps.navigation.getParam('matchId')),
})
const ConnectedMatchDetail = connect(mapStateToProps)(MatchDetail)
export {ConnectedMatchDetail as MatchDetail}
