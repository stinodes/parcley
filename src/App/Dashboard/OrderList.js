// @flow
import * as React from 'react';
import g from 'glamorous-native';
import { SystemView as View, flex } from 'nativesystem';

import { orders } from '../Redux/selectors';
import { connect } from 'react-redux';

import type { Order, Id } from 'parcley';
import { Text } from '../../Components';
import { OrderItem } from './OrderItem';

const Scroll = g.scrollView(flex);

type Props = {
  onItemPress: Id => any,
};
type MappedProps = {
  orders: { [Id]: Order },
};

class OrderList extends React.Component<ReduxProps<Props, MappedProps>> {
  render() {
    const { orders, onItemPress } = this.props;
    const orderArray: Order[] = Object.keys(orders).map(key => orders[key]);
    return (
      <Scroll f={1}>
        {orderArray.map(order => (
          <OrderItem
            key={order.uid}
            order={order}
            onPress={() => onItemPress(order.uid)}
          />
        ))}
      </Scroll>
    );
  }
}

const mapStateToProps = (state): MappedProps => ({
  orders: orders(state),
});
const ConnectedOrderList = connect(mapStateToProps)(OrderList);
export { ConnectedOrderList as OrderList };
