// @flow
import React, {PureComponent} from 'react'
import {Dimensions, Animated} from 'react-native'
import {connect} from 'react-redux'
import glamorous, {View} from 'glamorous-native'

import {Screen} from '../Components'
import BACKGROUND_IMAGE from './smoke-urban-bg.png'

import type {Store} from '../Store'
import {BackgroundImage} from '../Components/Containers'
import {BorderButton} from '../Components/Buttons'
import {LoginModal} from './LoginModal'

type MappedProps = {}
type LoginScreenProps = ReduxProps<{}, MappedProps>
type State = {
  loginModal: boolean,
  animation: Animated.Value,
}

const ButtonsContainer = glamorous(Animated.View)({
  flex: 1,
  paddingHorizontal: 64,
  justifyContent: 'center',
}, ({animation}) => ({
  transform: [
    {
      translateY: animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -1 * Dimensions.get('window').height * 0.6]
      })
    }
  ]
}))

class EntryScreen extends PureComponent<LoginScreenProps, State> {
  state = {
    loginModal: false,
    animation: new Animated.Value(0)
  }
  
  componentDidUpdate(oldProps, oldState) {
    if (oldState.loginModal && !this.state.loginModal)
      this.animateButtons(0)
    if (!oldState.loginModal && this.state.loginModal)
      this.animateButtons(1)
  }
  
  animateButtons(toValue: number) {
    Animated.spring(
      this.state.animation,
      {toValue}
    ).start()
  }
  
  onLoginPress = () => this.setState({loginModal: true})
  onLoginClose = () => this.setState({loginModal: false})
  onCreatePress = () => {}
  
  render() {
    const {animation, loginModal} = this.state
    return (
      <Screen dismissKeyboardOnTap>
        <BackgroundImage source={BACKGROUND_IMAGE}>
          <ButtonsContainer animation={this.state.animation}>
            <View marginVertical={16}>
              <BorderButton
                bold  raised
                onPress={this.onLoginPress}>
                Log in
              </BorderButton>
            </View>
            <View marginVertical={16}>
              <BorderButton
                secondary bold raised
                onPress={this.onCreatePress}>
                Create account
              </BorderButton>
            </View>
            
          </ButtonsContainer>
          <LoginModal visible={loginModal} close={this.onLoginClose}/>
        </BackgroundImage>
      </Screen>
    )
  }
}

const mapStateToProps = (state: Store): MappedProps => ({})

const ConnectedEntryScreen = connect(mapStateToProps)(EntryScreen)
export {ConnectedEntryScreen as EntryScreen}
