// @flow
import * as React from 'react'
import {Screen, SystemView as View, Base, getSpacing} from 'nativesystem'
import {connect} from 'react-redux'
import g from 'glamorous-native'

import {order} from '../Redux/selectors'

import type {Order} from 'parcley'
import {Text} from '../../Components'

type Props = {

}
type MappedProps = {
  order: Order,
}

const TopLeft = g(View)({
  position: 'absolute',
}, ({theme}) => ({
  top: getSpacing(theme, 3), left: getSpacing(theme, 3),
}))

class OrderDetail extends React.Component<Props> {
  render() {
    return (
      <Screen f={1} color="white">
        <TopLeft>
          <Base
            onPress={() => this.props.navigation.goBack()}
            background={Base.Ripple('ufoGreen', true)}>
            <View p={2}>
              <Text color="ufoGreen" modifier="large" bold>
                Back
              </Text>
            </View>
          </Base>
        </TopLeft>
      </Screen>
    )
  }
}

const mapStateToProps = (state, ownProps): MappedProps => ({
  order: order(state, ownProps.navigation.getParam('uid')),
})
const ConnectedOrderDetail = connect(mapStateToProps)(OrderDetail)
export {ConnectedOrderDetail as OrderDetail}
