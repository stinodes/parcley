// @flow
import * as React from 'react';
import { Screen, SystemView as View, Base, getSpacing } from 'nativesystem';
import { Separator } from 'nativesystem/lib/Components/Separator';
import { connect } from 'react-redux';
import g from 'glamorous-native';

import { order } from '../Redux/selectors';

import type { Order } from 'parcley';
import { Circle, Text } from '../../Components';
import { ScrollView } from 'react-native';
import { Header } from '../Header';
import moment from 'moment/moment';

type Props = {};
type MappedProps = {
  order: Order,
};

const TopLeft = g(View)(
  {
    position: 'absolute',
  },
  ({ theme }) => ({
    top: getSpacing(theme, 3),
    left: getSpacing(theme, 3),
  }),
);

class OrderDetail extends React.Component<Props> {
  render() {
    const { order } = this.props;
    return (
      <Screen f={1} color="white">
        <View pt={80} px={3}>
          <View>
            <Text align="center" bold modifier="large" color="arsenic">
              {order.name}
            </Text>

            <Text modifier="small" align="center">
              {moment(order.startedOn).format('dddd DD MMMM')}
            </Text>
          </View>
          <View ai="center" py={2}>
            <Circle color="ufoGreen" size={100} raised={10} />
          </View>
          <Separator color="gainsBoro" />
        </View>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            flexGrow: 1,
          }}>
          <View px={3} />
        </ScrollView>

        <Header
          left={
            <Base
              onPress={() => this.props.navigation.goBack()}
              background={Base.Ripple('ufoGreen', true)}>
              <View p={2}>
                <Text color="ufoGreen" bold>
                  Back
                </Text>
              </View>
            </Base>
          }
        />
      </Screen>
    );
  }
}

const mapStateToProps = (state, ownProps): MappedProps => ({
  order: order(state, ownProps.navigation.getParam('uid')),
});
const ConnectedOrderDetail = connect(mapStateToProps)(OrderDetail);
export { ConnectedOrderDetail as OrderDetail };
