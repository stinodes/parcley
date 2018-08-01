// @flow
import * as React from 'react'
import {connect} from 'react-redux'
import {order} from './Redux/selectors'

import type {Order} from 'coolio'

type Props = {

}
type MappedProps = {
  order: Order,
}

class OrderDetail extends React.Component<Props> {
  render() {
    return null
  }
}

const mapStateToProps = (state, ownProps): MappedProps => ({
  order: order(state, ownProps.navigation.getParam('orderId')),
})
const ConnectedOrderDetail = connect(mapStateToProps)(OrderDetail)
export {ConnectedOrderDetail as OrderDetail}
