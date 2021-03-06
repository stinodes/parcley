// @flow
import * as React from "react";
import { Animated, Dimensions } from "react-native";
import {
  Base,
  Button,
  flex,
  KeyboardAnimatedView,
  KeyboardConsumer,
  Keyboard,
  space,
  Spinner,
  SystemView as View,
  textColor,
  Absolute
} from "nativesystem";
import type { FormikBag } from "formik";
import { withFormik, Field } from "formik";
import g from "glamorous-native";

import {
  FormHelper,
  FTextInput,
  FullscreenModal,
  Icon,
  Text
} from "../Components";
import { createError } from "../Utils/messageBar";
import { login } from "./helpers";
import { Header } from "../App/Header";

const AnimatedView = g(Animated.View)(flex, space);

type Props = {
  ...FormikBag,
  close: () => any
};

class LoginForm extends React.Component<Props> {
  animations = {
    titleAnimation: new Animated.Value(0),
    inputsAnimation: new Animated.Value(0),
    submitButtonAnimation: new Animated.Value(0),
    closeButtonAnimation: new Animated.Value(0)
  };

  createAnimation = ({ animation, toValue }) => {
    const {
      titleAnimation,
      inputsAnimation,
      submitButtonAnimation,
      closeButtonAnimation
    } = this.animations;
    const config = {
      toValue,
      useNativeDriver: true,
      tension: 80,
      friction: 10
    };
    const animations = [
      Animated.spring(animation, config),
      Animated.spring(titleAnimation, config),
      Animated.spring(inputsAnimation, config),
      Animated.spring(submitButtonAnimation, config),
      Animated.spring(closeButtonAnimation, config)
    ];

    return Animated.stagger(
      50,
      toValue === 1 ? animations : animations.reverse()
    );
  };

  close = () => {
    this.props.close();
  };

  render() {
    const {
      visible,
      close,
      setFieldValue,
      values: { email, password },
      handleSubmit,
      isSubmitting,
      resetForm
    } = this.props;
    const {
      titleAnimation,
      inputsAnimation,
      submitButtonAnimation
    } = this.animations;
    const { height } = Dimensions.get("window");
    return (
      <FormHelper inputNames={["email", "password"]}>
        {({ email: emailHelper, password: passwordHelper }) => (
          <FullscreenModal
            visible={visible}
            onRequestClose={close}
            onHide={resetForm}
            createAnimation={this.createAnimation}
            screenProps={{
              dismissKeyboardOnTap: true,
              ignoredTargets: () => [emailHelper.input, passwordHelper.input]
            }}
            color="white"
          >
            <View px={3} jc="center" f={1}>
              <AnimatedView
                my={1}
                style={{
                  transform: [
                    {
                      translateY: titleAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [height * 0.5, 0]
                      })
                    }
                  ]
                }}
              >
                <Text color="raisinBlack">Log In</Text>
                <Text modifier="large" bold color="raisinBlack">
                  Welcome back!
                </Text>
              </AnimatedView>

              <AnimatedView
                style={{
                  transform: [
                    {
                      translateY: inputsAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [height * 0.5, 0]
                      })
                    }
                  ]
                }}
              >
                <Field
                  component={FTextInput}
                  label="E-mail address"
                  inputRef={emailHelper.ref}
                  name="email"
                  color="raisinBlack"
                  baseColor="raisinBlack"
                  accentColor="ufoGreen"
                  autoCapitalize="none"
                  keyboardType="email-address"
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
                        outputRange: [height * 0.5, 0]
                      })
                    }
                  ]
                }}
              >
                <Field
                  component={FTextInput}
                  label="Password"
                  secureTextEntry
                  inputRef={passwordHelper.ref}
                  name="password"
                  color="raisinBlack"
                  baseColor="raisinBlack"
                  accentColor="ufoGreen"
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
                        outputRange: [height * 0.5, 0]
                      })
                    }
                  ]
                }}
              >
                <View w={200} as="center" pt={2} pb={4}>
                  <Button
                    color="ufoGreen"
                    ripple="white"
                    raised={20}
                    onPress={handleSubmit}
                  >
                    {isSubmitting ? (
                      <Spinner color="white" />
                    ) : (
                      <Text color="white" bold>
                        Log In
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
                  background={Base.Ripple("frenchSky", true)}
                  onPress={Base.delayHandler(this.close)}
                >
                  <View w={64} h={64} jc="center" ai="center">
                    <Icon
                      name="chevron-left"
                      color="raisinBlack"
                      modifier="icon"
                    />
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

const FormikLoginForm = withFormik({
  mapPropsToValues: props => ({ email: "", password: "" }),
  handleSubmit: async (values, { props, setSubmitting }) => {
    setSubmitting(true);
    console.log(values);
    try {
      await login(values);
    } catch (e) {
      console.log(e);
      createError({
        title: e.message
      });
      setSubmitting(false);
    }
  }
})(LoginForm);

export { FormikLoginForm as LoginForm };
