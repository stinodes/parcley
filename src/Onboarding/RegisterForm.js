// @flow
import * as React from 'react';
import {
  Absolute,
  Base,
  Button,
  flex,
  KeyboardAnimatedView,
  space,
  Spinner,
  SystemView as View,
  textColor,
} from 'nativesystem';
import type { FormikBag } from 'formik';
import { withFormik } from 'formik';
import g from 'glamorous-native';

import {
  FormHelper,
  FTextInput,
  FullscreenModal,
  Icon,
  Text,
} from '../Components';
import { createError } from '../Utils/messageBar';
import { Animated, Dimensions, Keyboard } from 'react-native';
import { isUserUnique, registerUser, writeUserInfo } from './helpers';
import { Header } from '../App/Header';

const AnimatedView = g(Animated.View)(flex, space);

type Props = {
  ...FormikBag,
  visible: boolean,
  close: () => any,
};

class RegisterForm extends React.Component<Props> {
  animations = {
    titleAnimation: new Animated.Value(0),
    inputsAnimation: new Animated.Value(0),
    submitButtonAnimation: new Animated.Value(0),
    closeButtonAnimation: new Animated.Value(0),
  };

  createAnimation = ({ animation, toValue }) => {
    const {
      titleAnimation,
      inputsAnimation,
      submitButtonAnimation,
      closeButtonAnimation,
    } = this.animations;
    const config = {
      toValue,
      useNativeDriver: true,
      tension: 80,
      friction: 10,
    };
    const animations = [
      Animated.spring(animation, config),
      Animated.spring(titleAnimation, config),
      Animated.spring(inputsAnimation, config),
      Animated.spring(submitButtonAnimation, config),
      Animated.spring(closeButtonAnimation, config),
    ];

    return Animated.stagger(
      50,
      toValue === 1 ? animations : animations.reverse(),
    );
  };

  close = () => {
    Keyboard.dismiss();
    this.props.close();
  };

  render() {
    const {
      visible,
      close,
      setFieldValue,
      values: { email, password, username },
      handleSubmit,
      isSubmitting,
      resetForm,
    } = this.props;
    const {
      titleAnimation,
      inputsAnimation,
      submitButtonAnimation,
      closeButtonAnimation,
    } = this.animations;
    const { height } = Dimensions.get('window');
    return (
      <FormHelper inputNames={['email', 'username', 'password']}>
        {({
          email: emailHelper,
          username: usernameHelper,
          password: passwordHelper,
        }) => (
          <FullscreenModal
            visible={visible}
            onRequestClose={close}
            createAnimation={this.createAnimation}
            color="white"
            onHide={resetForm}
            screenProps={{
              dismissKeyboardOnTap: true,
              ignoredTargets: () => [
                emailHelper.input,
                usernameHelper.input,
                passwordHelper.input,
              ],
            }}>
            <View px={3} jc="center" f={1}>
              <AnimatedView
                my={1}
                style={{
                  transform: [
                    {
                      translateY: titleAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [height * 0.5, 0],
                      }),
                    },
                  ],
                }}>
                <Text color="raisinBlack">Sign Up</Text>
                <Text modifier="large" bold color="raisinBlack">
                  Fancy meeting you!
                </Text>
              </AnimatedView>

              <AnimatedView
                style={{
                  transform: [
                    {
                      translateY: inputsAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [height * 0.5, 0],
                      }),
                    },
                  ],
                }}>
                <FTextInput
                  inputRef={emailHelper.ref}
                  name="email"
                  value={email}
                  onChange={setFieldValue}
                  label="E-mail address"
                  color="raisinBlack"
                  baseColor="raisinBlack"
                  accentColor="gunMetal"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  returnKeyType="next"
                  onSubmitEditing={usernameHelper.focus}
                />
              </AnimatedView>
              <AnimatedView
                style={{
                  transform: [
                    {
                      translateY: inputsAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [height * 0.5, 0],
                      }),
                    },
                  ],
                }}>
                <FTextInput
                  inputRef={usernameHelper.ref}
                  name="username"
                  label="Username"
                  value={username}
                  onChange={setFieldValue}
                  color="raisinBlack"
                  baseColor="raisinBlack"
                  accentColor="gunMetal"
                  autoCapitalize="none"
                  returnKeyType="next"
                  onSubmitEditing={passwordHelper.focus}
                />
              </AnimatedView>
              <AnimatedView
                style={{
                  transform: [
                    {
                      translateY: inputsAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [height * 0.5, 0],
                      }),
                    },
                  ],
                }}>
                <FTextInput
                  secureTextEntry
                  inputRef={passwordHelper.ref}
                  label="Password"
                  name="password"
                  value={password}
                  onChange={setFieldValue}
                  color="raisinBlack"
                  baseColor="raisinBlack"
                  accentColor="gunMetal"
                  autoCapitalize="none"
                  returnKeyType="send"
                  onSubmitEditing={handleSubmit}
                />
              </AnimatedView>

              <AnimatedView
                style={{
                  transform: [
                    {
                      translateY: submitButtonAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [height * 0.5, 0],
                      }),
                    },
                  ],
                }}>
                <View w={200} as="center" pt={2} pb={4}>
                  <Button
                    color="gunMetal"
                    ripple="white"
                    raised={20}
                    onPress={handleSubmit}>
                    {isSubmitting ? (
                      <Spinner color="white" />
                    ) : (
                      <Text color="white" bold>
                        Sign Up
                      </Text>
                    )}
                  </Button>
                </View>
              </AnimatedView>
              <KeyboardAnimatedView />
            </View>
            <Header
              left={
                <Base
                  background={Base.Ripple('frenchSky', true)}
                  onPress={Base.delayHandler(this.close)}>
                  <View w={64} h={64} jc="center" ai="center">
                    <Icon name="chevron-left" color="raisinBlack" size={40} />
                  </View>
                </Base>
              }
            />
          </FullscreenModal>
        )}
      </FormHelper>
    );
  }
}

const FormikRegisterForm = withFormik({
  mapPropsToValues: props => ({ email: '', username: '', password: '' }),
  handleSubmit: async (
    { username, email, password },
    { props, setSubmitting, setErrors },
  ) => {
    setSubmitting(true);
    try {
      await registerUser({ username, email, password });
    } catch (e) {
      console.log(e);
      createError({
        title: e.message,
      });
    }
    setSubmitting(false);
  },
})(RegisterForm);

export { FormikRegisterForm as RegisterForm };
