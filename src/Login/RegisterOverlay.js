// @flow
import React, {Component} from 'react'
import {Animated, Dimensions} from 'react-native'
import glamorous from 'glamorous-native'

import {BackgroundImage} from '../Components/Containers'
import BACKGROUND_IMAGE from './smoke-urban-bg.png'
import {StyledButton} from '../Components/Buttons'

const View = glamorous.View
const AbsoluteContainer = glamorous.view({
  position: 'absolute',
  top: 0, left: 0, right: 0, bottom: 0,
})
const AnimatedOpacity = glamorous(Animated.View)(
  ({animation, reverse}) => ({
    flex: 1,
    opacity: animation.interpolate({
      inputRange: [0, 1],
      outputRange: reverse ? [1, 0] : [0, 1],
    })
  })
)
const MorphingButtonView = glamorous(Animated.View)(
  ({transformDrivers, backgroundColorDriver, theme}) => {
    return {
      position: 'absolute',
      top: 0, left: 0, right: 0, bottom: 0,
      borderRadius: theme.misc.buttonRadius,
      transform: transformDrivers,
    }
  }
)
const ColorAnimation = glamorous(Animated.View)(
  ({animation, theme}) => ({
    flex: 1,
    backgroundColor: animation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [theme.base.primary, theme.colors.lightPink, theme.colors.lightPink]
    })
  })
)

type Props = {
  close: () => any,
  visible: boolean,
  startLayout: { width: number, height: number, x: number, y: number, }
}
type State = {
  shown: boolean,
  colorAnim: Animated.Value,
  morphingButtonAnimation: Animated.Value,
}

class RegisterOverlay extends Component<Props, State> {
  state = {
    shown: false,
    colorAnimation: new Animated.Value(0),
    morphingButtonHorizontalAnimation: new Animated.Value(0),
    morphingButtonVerticalAnimation: new Animated.Value(0),
  }
  
  componentWillReceiveProps(newProps: Props) {
    if (newProps.visible && !this.props.visible) {
      this.setState({shown: true})
    }
  }
  
  componentDidUpdate(oldProps: Props) {
    if (!oldProps.visible && this.props.visible) {
      this.animate(1)
    }
    else if (oldProps.visible && !this.props.visible) {
      this.animate(0)
    }
  }
  
  animate(toValue: number) {
    const defaultStaggeredAnimations = [
      Animated.spring(
        this.state.morphingButtonHorizontalAnimation,
        {toValue, tension: 80, friction: 15, useNativeDriver: true,},
      ),
      Animated.spring(
        this.state.morphingButtonVerticalAnimation,
        {toValue, tension: 80, friction: 15, useNativeDriver: true,},
      ),
    ]
    
    const staggeredAnimations = toValue === 1 ? defaultStaggeredAnimations : defaultStaggeredAnimations.reverse()
    const staggerDelay = toValue === 1 ? 100 : 200
    
    Animated.parallel([
      Animated.stagger(staggerDelay, staggeredAnimations),
      Animated.timing(
        this.state.colorAnimation,
        {toValue, duration: 200},
      ),
    ])
      .start(
        () => {
          !toValue && this.setState({shown: false})
        }
      )
  }
  
  render() {
    const {shown, morphingButtonHorizontalAnimation, morphingButtonVerticalAnimation, colorAnimation} = this.state
    const {startLayout, close} = this.props
    const {width, height} = Dimensions.get('window')
    if (!startLayout || !shown) return null
    
    const translateX = {
      translateX: morphingButtonHorizontalAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0],
      })
    }
    const translateY = {
      translateY: morphingButtonVerticalAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [startLayout.y - height * .5 + 16, 0],
      })
    }
    const scaleX = {
      scaleX: morphingButtonHorizontalAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [startLayout.width / width, 1],
      })
    }
    const scaleY = {
      scaleY: morphingButtonVerticalAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [startLayout.height / height, 1],
      })
    }
    
    return (
      <MorphingButtonView
        transformDrivers={[translateX, translateY, scaleX, scaleY]}>
        <ColorAnimation animation={colorAnimation}>
          
          <AnimatedOpacity animation={colorAnimation}>
            <View flex={1} justifyContent="center" alignItems="center">
              <StyledButton small onPress={close}>
                Hide
              </StyledButton>
            </View>
          </AnimatedOpacity>
          
        </ColorAnimation>
      </MorphingButtonView>
    )
  }
}

export {RegisterOverlay}
