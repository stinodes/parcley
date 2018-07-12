// @flow
import * as React from 'react'
import g from 'glamorous-native'
import {SystemView as View, flex} from 'nativesystem'

import {matches} from '../Redux/selectors'
import {connect} from 'react-redux'

import type {Match, Id} from 'coolio'
import {Text} from '../../Components'
import {MatchItem} from './MatchItem'

const Scroll = g.scrollView(flex)

type Props = {

}
type MappedProps = {
  matches: {[Id]: Match},
}

class MatchList extends React.Component<Props> {
  render() {
    const {matches} = this.props
    const matchArray: Match[] = Object.keys(matches).map(key => matches[key])
    return (
      <Scroll f={1}>
        {
          matchArray.map(match =>
            <MatchItem match={match} onPress={() => {}}/>
          )
        }
      </Scroll>
    )
  }
}

const mapStateToProps = (state): MappedProps => ({
    matches: matches(state),
})
const ConnectedMatchList = connect(mapStateToProps)(MatchList)
export {ConnectedMatchList as MatchList}
