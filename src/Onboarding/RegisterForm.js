// @flow
import * as React from 'react'
import * as firebase from 'firebase'
import {
  Base, Button, flex, FTextInput, KeyboardAnimatedView, space, Spinner, SystemView as View,
  textColor
} from 'nativesystem'
import type {FormikBag} from 'formik'
import {withFormik} from 'formik'
import Icon from 'react-native-vector-icons/MaterialIcons'
import g from 'glamorous-native'

import {FormHelper, FullscreenModal, Text} from '../Components'
import {createError} from '../Utils/messageBar'
import {Animated, Dimensions} from 'react-native'
import {isUserUnique, registerUser, writeUserInfo} from '../Firebase/helpers'

const AnimatedView = g(Animated.View)(flex, space)
const GIcon = g(Icon)(textColor)

type Props = {
  ...FormikBag,
  visible: boolean,
  close: () => any,
}

class RegisterForm extends React.Component<Props> {
  
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
    const {visible, close, setFieldValue, values: {email, password, username}, handleSubmit, isSubmitting, resetForm} = this.props
    const {titleAnimation, inputsAnimation, submitButtonAnimation, closeButtonAnimation} = this.animations
    const {height} = Dimensions.get('window')
    return (
      <FormHelper inputNames={['email', 'username', 'password']}>
        {({email: emailHelper, username: usernameHelper, password: passwordHelper}) =>
          <FullscreenModal
            invertStatusBarStyle
            visible={visible}
            onRequestClose={close}
            createAnimation={this.createAnimation}
            color="frenchSky"
            onHide={resetForm}
            screenProps={{
              dismissKeyboardOnTap: true,
              ignoredTargets: () => [emailHelper.input, usernameHelper.input, passwordHelper.input],
            }}
            statusBarColor="frenchSky"
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
                <Text modifier="large" bold color="white">
                  Hi there, friend!
                </Text>
                <Text color="white">
                  Who are you?
                </Text>
              </AnimatedView>
              
              <AnimatedView
                my={2}
                style={{
                  transform: [{
                    translateY: inputsAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [height * 0.5, 0],
                    })
                  }]
                }}>
                <Text modifier="small" color="white">
                  E-mail address
                </Text>
                <FTextInput
                  inputRef={emailHelper.ref}
                  name="email"
                  value={email}
                  onChange={setFieldValue}
                  color="white"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  returnKeyType="next"
                  onSubmitEditing={usernameHelper.focus}
                  underlineColorAndroid="white"/>
              </AnimatedView>
              <AnimatedView
                my={2}
                style={{
                  transform: [{
                    translateY: inputsAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [height * 0.5, 0],
                    })
                  }]
                }}>
                <Text modifier="small" color="white">
                  Username
                </Text>
                <FTextInput
                  inputRef={usernameHelper.ref}
                  name="username"
                  value={username}
                  onChange={setFieldValue}
                  color="white"
                  autoCapitalize="none"
                  returnKeyType="next"
                  onSubmitEditing={passwordHelper.focus}
                  underlineColorAndroid="white"/>
              </AnimatedView>
              <AnimatedView
                my={2}
                style={{
                  transform: [{
                    translateY: inputsAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [height * 0.5, 0],
                    })
                  }]
                }}>
                <Text modifier="small" color="white">
                  Password
                </Text>
                <FTextInput
                  secureTextEntry
                  inputRef={passwordHelper.ref}
                  name="password"
                  value={password}
                  onChange={setFieldValue}
                  color="white"
                  autoCapitalize="none"
                  returnKeyType="send"
                  onSubmitEditing={handleSubmit}
                  underlineColorAndroid="white"/>
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
                    color="white" ripple="frenchSky" raised={20}
                    onPress={handleSubmit}>
                    {isSubmitting ?
                      <Spinner color="frenchSky"/> :
                      <Text color="frenchSky" bold>Sign Up</Text>
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

const FormikRegisterForm = withFormik({
  mapPropsToValues: props => ({email: '', username: '', password: ''}),
  handleSubmit: async ({username, email, password}, {props, setSubmitting, setErrors}) => {
    setSubmitting(true)
    try {
      await registerUser({username, email, password})
    }
    catch (e) {
      console.log(e)
      createError({
        title: e.message,
      })
    }
    setSubmitting(false)
  }
})(RegisterForm)

export {FormikRegisterForm as RegisterForm}
