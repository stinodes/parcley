// @flow
import * as React from 'react';
import {
  Base,
  flex,
  getSpacing,
  Screen,
  size,
  space,
  SystemView as View,
} from 'nativesystem';
import { Animated, Dimensions, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import { Icon } from '../../Components';
import { order } from '../Redux/selectors';
import { meId } from '../../Onboarding/Redux/selectors';
import { Header } from '../Header';
import { MemberItem } from './MemberItem';
import { OrderInformation } from './OrderInformation';
import { ScoreForm } from './ScoreForm';

import type { Member, Order } from 'parcley';
import type {
  NavigationScreenProp,
  NavigationStateRoute,
} from 'react-navigation';
import { AskScoreItem } from './AskScoreItem';
import { SwipeItem } from './SwipeItem';
import { UserDetailModal } from './UserDetailModal';
import { measureInWindow } from '../../Utils';

type Props = {
  navigation: NavigationScreenProp<NavigationStateRoute>,
};
type MappedProps = {
  order: Order,
  meUid: string,
};
type State = {
  infoExpandedHeight: number,
  infoCollapsedHeight: number,
  entryOpacityAnimation: Animated.Value,
  entryPositionAnimation: Animated.Value,
  scrollAnimation: Animated.Value,
  userDetailModalStartPosition: {
    x: number,
    y: number,
    w: number,
    h: number,
  },
  userDetailModalMember: ?string,
  userDetailModalVisible: boolean,
};

class OrderDetail extends React.Component<
  ReduxProps<Props, MappedProps>,
  State,
> {
  state = {
    infoExpandedHeight: 220,
    infoCollapsedHeight: 80,
    entryOpacityAnimation: new Animated.Value(0),
    entryPositionAnimation: new Animated.Value(0),
    scrollAnimation: new Animated.Value(0),
    userDetailModalStartPosition: {
      x: 0,
      y: 0,
      w: 0,
      h: 0,
    },
    userDetailModalMember: null,
    userDetailModalVisible: false,
  };

  itemRefs: {
    [string]: ?View,
  } = {};
  scrollView: ScrollView;

  componentDidMount() {
    if (this.state.infoExpandedHeight !== 1) this.entryAnimation();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.infoHeight !== prevState.infoExpandedHeight)
      this.entryAnimation();
  }

  entryAnimation = () => {
    Animated.parallel([
      Animated.timing(this.state.entryOpacityAnimation, { toValue: 1 }),
      Animated.spring(this.state.entryPositionAnimation, { toValue: 1 }),
    ]).start();
  };

  onInfoLayout = event => {
    this.setState({
      infoExpandedHeight: event.nativeEvent.layout.height,
    });
  };

  onScrollEnd = e => {
    const { infoCollapsedHeight, infoExpandedHeight } = this.state;
    const interval = infoExpandedHeight - infoCollapsedHeight;
    const velocity = e.nativeEvent.velocity.y;
    const offset = e.nativeEvent.contentOffset.y;
    if (offset <= interval) {
      if (velocity > 0)
        this.scrollView.getNode().scrollTo({ y: 0, animated: true });
      if (velocity <= 0)
        this.scrollView.getNode().scrollTo({ y: interval, animated: true });
    }
  };

  showUserDetailModal = async (uid: string) => {
    const ref = this.itemRefs[uid];
    if (!ref) return;
    const { x, y, w, h } = await measureInWindow(ref);
    this.setState({
      userDetailModalStartPosition: {
        y,
        x,
        w,
        h,
      },
      userDetailModalMember: uid,
      userDetailModalVisible: true,
    });
  };

  render() {
    const {
      entryOpacityAnimation,
      entryPositionAnimation,
      infoExpandedHeight,
      infoCollapsedHeight,
      scrollAnimation,
      userDetailModalMember,
      userDetailModalVisible,
      userDetailModalStartPosition,
    } = this.state;
    const { order, meUid } = this.props;
    const members: Member[] = Object.keys(order.members).map(
      key => order.members[key],
    );
    const host = members.find(member => member.uid === order.host);
    const ownMember = Object.keys(order.members)
      .map(key => order.members[key])
      .find(member => member.uid === meUid);

    const entryOpacity = entryOpacityAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });
    return (
      <Screen f={1} color="white">
        <Animated.ScrollView
          style={{
            flex: 1,
            opacity: entryOpacity,
            transform: [
              {
                translateY: entryPositionAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [Dimensions.get('window').height * 0.33, 0],
                }),
              },
            ],
          }}
          ref={comp => (this.scrollView = comp)}
          contentContainerStyle={{
            flexGrow: 1,
            paddingTop: infoExpandedHeight + 80,
          }}
          scrollEventThrottle={16}
          onScrollEndDrag={this.onScrollEnd}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: { y: this.state.scrollAnimation },
                },
              },
            ],
            {
              useNativeDriver: true,
            },
          )}>
          <View>
            {ownMember &&
              (ownMember.score === null || ownMember.score === undefined) && (
                <AskScoreItem
                  onPress={() => this.showUserDetailModal(ownMember.uid)}
                />
              )}
            {host && (
              <View
                onLayout={() => {}}
                innerRef={component => (this.itemRefs[host.uid] = component)}>
                <MemberItem
                  member={host}
                  host
                  onPress={() => this.showUserDetailModal(host.uid)}
                />
              </View>
            )}
            {ownMember &&
              ownMember.uid !== order.host && (
                <View
                  onLayout={() => {}}
                  innerRef={component =>
                    (this.itemRefs[ownMember.uid] = component)
                  }>
                  <MemberItem
                    member={ownMember}
                    onPress={() => this.showUserDetailModal(ownMember.uid)}
                  />
                </View>
              )}
            {members.map(
              member =>
                member.uid !== order.host &&
                member.uid !== meUid && (
                  <View
                    onLayout={() => {}}
                    innerRef={component =>
                      (this.itemRefs[member.uid] = component)
                    }>
                    <MemberItem
                      member={member}
                      onPress={() => this.showUserDetailModal(member.uid)}
                    />
                  </View>
                ),
            )}
          </View>
        </Animated.ScrollView>
        <OrderInformation
          height={infoExpandedHeight}
          collapsedHeight={infoCollapsedHeight}
          order={order}
          scrollAnimation={scrollAnimation}
        />
        <UserDetailModal
          onRequestClose={() =>
            this.setState({ userDetailModalVisible: false })
          }
          visible={!!userDetailModalVisible}
          startPosition={userDetailModalStartPosition}
          order={order}
          member={members.find(member => member.uid === userDetailModalMember)}
        />
        <Header
          left={
            <Base
              onPress={() => this.props.navigation.goBack()}
              background={Base.Ripple('ufoGreen', true)}>
              <View p={2}>
                <Icon name="arrow-left" color="ufoGreen" size={24} />
              </View>
            </Base>
          }
          right={
            <Base onPress={() => {}} background={Base.Ripple('ufoGreen', true)}>
              <View p={2}>
                <Icon name="edit" color="ufoGreen" size={24} />
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
  meUid: meId(state) || '',
});
const ConnectedOrderDetail = connect(mapStateToProps)(OrderDetail);
export { ConnectedOrderDetail as OrderDetail };
