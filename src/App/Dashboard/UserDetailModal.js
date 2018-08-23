// @flow
import * as React from 'react';
import { Animated, Dimensions } from 'react-native';
import { Coordinator, Element, View, Button } from 'nativesystem';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { connect } from 'react-redux';

import { Background, Modal, Text } from '../../Components';
import { Separator } from 'nativesystem/lib/Components/Separator';
import { meId } from '../../Onboarding/Redux/selectors';
import { createError } from '../../Utils/messageBar';

import type { Member, Order, FriendInformation } from 'parcley';
import { MemberItem } from './MemberItem';
import { friend } from '../Redux/selectors';
import { addFriend } from '../helpers';

type Props = {
  visible: boolean,
  startPosition: { x: number, y: number, w: number, h: number },
  onRequestClose: () => any,
  member: ?Member,
  order: ?Order,
};
type MappedProps = {
  meUid: ?string,
  friendInfo: ?FriendInformation,
};
type ComponentState = {
  animation: Animated.Value,
};

class UserDetailModal extends React.Component<
  ReduxProps<Props, MappedProps>,
  ComponentState,
> {
  state = {
    animation: new Animated.Value(Dimensions.get('window').height),
  };

  height = Dimensions.get('window').height;
  gestureEvent = Animated.event(
    [{ nativeEvent: { translationY: this.state.animation } }],
    { userNativeDriver: true },
  );

  gestureEventStateChange = ({
    nativeEvent: { state, translationY, velocityY },
  }: {
    nativeEvent: { state: number, translationY: number, velocityY: number },
  }) => {
    if (state === State.END) {
      if (translationY < 75)
        Animated.spring(this.state.animation, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      else
        Animated.spring(this.state.animation, {
          toValue: this.height,
          velocity: velocityY,
          overshootClamping: true,
          useNativeDriver: true,
        }).start(this.props.onRequestClose);
    }
  };

  createAnimation = ({
    animation,
    toValue,
  }: {
    animation: Animated.Value,
    toValue: number,
  }) => {
    if (toValue === 1)
      return Animated.parallel([
        Animated.timing(animation, {
          toValue,
          duration: 0,
          useNativeDriver: true,
        }),
        Animated.spring(this.state.animation, {
          toValue,
          overshootClamping: false,
          useNativeDriver: true,
        }),
      ]);
    return Animated.sequence([
      Animated.spring(this.state.animation, {
        toValue: this.height,
        useNativeDriver: true,
      }),
      Animated.timing(animation, {
        toValue,
        duration: 0,
        useNativeDriver: true,
      }),
    ]);
  };

  addFriend = async () => {
    if (!this.props.member || !this.props.meUid) return;
    if (this.props.member.uid === this.props.meUid)
      return createError({
        message: "You can't add yourself as a friend, dumbass.",
      });

    if (this.props.friendInfo)
      createError({
        message: 'Already friends!',
      });

    await addFriend(this.props.meUid, this.props.member.uid);
  };

  render() {
    const {
      visible,
      startPosition: { x, y, w, h },
      member,
      order,
      friendInfo,
    } = this.props;
    const height = this.height;
    return (
      <Modal
        visible={visible}
        onRequestClose={this.props.onRequestClose}
        createAnimation={this.createAnimation}>
        <PanGestureHandler
          onHandlerStateChange={this.gestureEventStateChange}
          onGestureEvent={this.gestureEvent}>
          <View f={1}>
            <Coordinator
              f={1}
              animation={this.state.animation.interpolate({
                inputRange: [0, height],
                outputRange: [height, 0],
                extrapolate: 'clamp',
              })}
              inputRange={[0, height]}>
              <Element
                positioning={{ top: 0, bottom: 0, left: 0, right: 0 }}
                start={{ opacity: 0 }}
                end={{ opacity: 1 }}>
                <Background f={1} color="white" pt={80 + h + 1} px={3}>
                  <Separator color="gainsBoro" />
                  <View py={2} fd="row" jc="space-around">
                    <Button ripple="white" onPress={this.addFriend}>
                      <Text color="white">Add Friend</Text>
                    </Button>
                  </View>
                </Background>
              </Element>
              <Element
                positioning={{ top: 0, left: 0 }}
                start={{ x, y }}
                end={{ x: 0, y: 80 }}>
                <View w={w} h={h}>
                  {member && (
                    <MemberItem
                      member={member}
                      host={!!order && member.uid === order.host}
                    />
                  )}
                </View>
              </Element>
            </Coordinator>
          </View>
        </PanGestureHandler>
      </Modal>
    );
  }
}

const mapStateToProps = (state, ownProps: Props): MappedProps => ({
  meUid: meId(state),
  friendInfo: ownProps.member ? friend(state, ownProps.member.uid) : null,
});
const ConnectedUserDetailModal = connect(mapStateToProps)(UserDetailModal);

export { ConnectedUserDetailModal as UserDetailModal };
