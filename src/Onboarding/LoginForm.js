// @flow
import * as React from 'react'
import {Animated, Dimensions} from 'react-native'
import {
  Base, Button, flex, KeyboardAnimatedView, space, Spinner, SystemView as View,
  textColor
} from 'nativesystem'
import type {FormikBag} from 'formik'
import {withFormik} from 'formik'
import Icon from 'react-native-vector-icons/MaterialIcons'
import g from 'glamorous-native'

import {FormHelper, FTextInput, FullscreenModal, Text} from '../Components'
import {createError} from '../Utils/messageBar'
import {login} from './helpers'

const AnimatedView = g(Animated.View)(flex, space)
const GIcon = g(Icon)(textColor)

type Props = {
  ...FormikBag,
  close: () => any,
}

class LoginForm extends React.Component<Props> {
  
  animations = {
    titleAnimation: new Animated.Value(0),
    inputsAnimation: new Animated.Value(0),
    submitButtonAnimation: new Animated.Value(0),
    closeButtonAnimation: new Animated.Value(0),
  }
  
  createAnimation = ({animation, toValue}) => {
    const {titleAnimation, inputsAnimation, submitButtonAnimation, closeButtonAnimation} = this.animations
    const config = {
      toValue, useNativeDriver: true, tension: 80, friction: 10,
    }
    const animations = [
      Animated.spring(animation, config),
      Animated.spring(titleAnimation, config),
      Animated.spring(inputsAnimation, config),
      Animated.spring(submitButtonAnimation, config),
      Animated.spring(closeButtonAnimation, config),
    ]
    
    return Animated.stagger(50, toValue === 1 ? animations : animations.reverse())
  }
  
  render() {
    const {visible, close, setFieldValue, values: {email, password}, handleSubmit, isSubmitting, resetForm} = this.props
    const {titleAnimation, inputsAnimation, submitButtonAnimation, closeButtonAnimation} = this.animations
    const {height} = Dimensions.get('window')
    return (
      <FormHelper inputNames={['email', 'password']}>
        {({email: emailHelper, password: passwordHelper}) =>
          <FullscreenModal
            invertStatusBarStyle
            visible={visible}
            onRequestClose={close}
            onHide={resetForm}
            createAnimation={this.createAnimation}
            color="ufoGreen"
            statusBarColor="ufoGreen"
            statusBarStyle="light-content">
            <View px={3} jc="center" f={1}>
              
              <AnimatedView
                my={2}
                style={{
                  transform: [{
                    translateY: titleAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [height * 0.5, 0],
                    })
                  }]
                }}>
                <Text modifier="large" bold color="white">Welcome back!</Text>
              </AnimatedView>
              
              <AnimatedView
                style={{
                  transform: [{
                    translateY: inputsAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [height * 0.5, 0],
                    })
                  }]
                }}>
                <FTextInput
                  label="E-mail address"
                  inputRef={emailHelper.ref}
                  name="email"
                  value={email}
                  onChange={setFieldValue}
                  color="white"
                  accentColor="white"
                  baseColor="white"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  returnKeyType="next"
                  onSubmitEditing={passwordHelper.focus}/>
              </AnimatedView>
              <AnimatedView
                style={{
                  transform: [{
                    translateY: inputsAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [height * 0.5, 0],
                    })
                  }]
                }}>
                <FTextInput
                  label="Password"
                  secureTextEntry
                  inputRef={passwordHelper.ref}
                  name="password"
                  value={password}
                  onChange={setFieldValue}
                  color="white"
                  accentColor="white"
                  baseColor="white"
                  autoCapitalize="none"
                  returnKeyType="send"
                  onSubmitEditing={handleSubmit}/>
              </AnimatedView>
              <AnimatedView
                style={{
                  transform: [{
                    translateY: submitButtonAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [height * 0.5, 0],
                    })
                  }]
                }}>
                <View
                  w={200}
                  as="center"
                  pt={2} pb={4}>
                  <Button
                    color="white" ripple="ufoGreen" raised={20}
                    onPress={handleSubmit}>
                    {isSubmitting ?
                      <Spinner color="ufoGreen"/> :
                      <Text color="ufoGreen" bold>Log In</Text>
                    }
                  </Button>
                </View>
              </AnimatedView>
              <AnimatedView
                as="center"
                style={{
                  transform: [{
                    translateY: closeButtonAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [height * 0.5, 0],
                    })
                  }]
                }}>
                <Base
                  background={Base.Ripple('white', true)}
                  onPress={Base.delayHandler(this.props.close)}>
                  <View w={64} h={64} jc="center" ai="center">
                    <GIcon name="close" color="white" size={40}/>
                  </View>
                </Base>
              </AnimatedView>
              <KeyboardAnimatedView/>
            </View>
          </FullscreenModal>
        }
      </FormHelper>
    )
  }
}

const FormikLoginForm = withFormik({
  mapPropsToValues: props => ({email: '', password: ''}),
  handleSubmit: async (values, {props, setSubmitting}) => {
    setSubmitting(true)
    try {
      await login(values)
    }
    catch (e) {
      console.log(e)
      createError({
        title: e.message,
      })
      setSubmitting(false)
    }
  }
})(LoginForm)

export {FormikLoginForm as LoginForm}
