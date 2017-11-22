// @flow
import React, {Component} from 'react'
import {Animated, Dimensions} from 'react-native'
import {connect} from 'react-redux'
import glamorous from 'glamorous-native'
import {Field, Formik} from 'formik'

import {Screen, StyledButton, TextInputField} from '../Components'
import {actions} from './Redux'

import type {Store} from '../flowtypes'

const {View} = glamorous

type LoginCreds = { email: string, password: string }
type RegisterCreds = { displayName: string, email: string, password: string, confirmPassword: string, }
type MappedProps = {
  mode: 'register' | 'login',
}
type OwnProps = {}
type State = {
  mountAnimation: Animated.Value,
  finishedMounting: boolean,
  registerFieldHeight: number,
  registerFieldsShown: boolean,
  registerFieldsHeightAnimation: Animated.Value,
  registerFieldsOpacityAnimation: Animated.Value,
}

class Onboarding extends Component<ReduxProps<OwnProps, MappedProps>, State> {

  state = {
    mountAnimation: new Animated.Value(0),
    finishedMounting: false,
    registerFieldHeight: 0,
    registerFieldsShown: false,
    registerFieldsHeightAnimation: new Animated.Value(0),
    registerFieldsOpacityAnimation: new Animated.Value(0),
  }

  componentDidUpdate(oldProps, oldState) {
    if (oldState.registerFieldHeight !== this.state.registerFieldHeight && !!this.state.registerFieldHeight) {
      this.mountAnimation()
    }
  }

  mountAnimation() {
    Animated.spring(
      this.state.mountAnimation,
      {toValue: 1,},
    ).start(() => {
      this.setState({finishedMounting: true})
    })
  }

  onRegisterPress = () => {
    if (!this.state.registerFieldsShown) {
      return this.showRegisterFields()
    }
  }
  onLoginPress = () => {
    if (this.state.registerFieldsShown) {
      return this.hideRegisterFields()
    }
  }

  showRegisterFields = () => {
    Animated.stagger(
      200,
      [
        Animated.spring(
          this.state.registerFieldsHeightAnimation,
          {toValue: 1, friction: 10, tension: 80},
        ),
        Animated.timing(
          this.state.registerFieldsOpacityAnimation,
          {toValue: 1, duration: 100},
        ),
      ],
    ).start(() => this.setState({registerFieldsShown: true}))
  }
  hideRegisterFields = () => {
    Animated.sequence(
      [
        Animated.timing(
          this.state.registerFieldsOpacityAnimation,
          {toValue: 0, duration: 100},
        ),
        Animated.spring(
          this.state.registerFieldsHeightAnimation,
          {toValue: 0, friction: 10, tension: 80}
        ),
      ],
    ).start(() => this.setState({registerFieldsShown: false}))
  }
  onRegisterFieldsLayout = (e) => {
    if (!!this.state.registerFieldHeight) return
    const height = e.nativeEvent.layout.height
    this.setState({registerFieldHeight: height})
  }

  onSubmit = (...args) => this.state.registerFieldsShown ? this.onSubmitRegister(...args) : this.onSubmitLogin(...args)
  onSubmitLogin = (values: LoginCreds, formikActions) => this.props.dispatch(actions.login(values.email, values.password))
  onSubmitRegister = (values: RegisterCreds, formikActions) => this.props.dispatch(actions.register(values.displayName, values.email, values.password))

  render() {
    return (
      <Screen>

        <Formik
          initialValues={{}}
          onSubmit={this.onSubmit}>
          {(formik) => (
            <View
              flex={1}
              paddingHorizontal={64}
              justifyContent="center">
              <Animated.View
                style={{
                  opacity: this.state.mountAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                    extrapolateRight: 'clamp',
                  })
                }}>
                <View paddingVertical={16}>
                  <Field
                    secondary
                    large
                    placeholder="E-mail address"
                    name="email"
                    component={TextInputField}/>
                </View>
                <View paddingVertical={16}>
                  <Field
                    secondary
                    large
                    secureTextEntry
                    placeholder="Password"
                    name="password"
                    component={TextInputField}/>
                </View>
                <Animated.View
                  style={!!this.state.registerFieldHeight && {
                    opacity: this.state.registerFieldsOpacityAnimation,
                    height: this.state.registerFieldsHeightAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, this.state.registerFieldHeight],
                      extrapolateLeft: 'clamp',
                    }),
                  }}>
                  <View
                    onLayout={
                      !this.state.registerFieldSize ?
                        this.onRegisterFieldsLayout
                        : undefined}>
                    <View paddingVertical={16}>
                      <Field
                        secondary
                        large
                        placeholder="Displayed name"
                        name="displayName"
                        component={TextInputField}/>
                    </View>
                    <View paddingVertical={16}>
                      <Field
                        secondary
                        large
                        secureTextEntry
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        component={TextInputField}/>
                    </View>
                  </View>
                </Animated.View>
              </Animated.View>
              <Animated.View
                style={{
                  opacity: this.state.mountAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                    extrapolateRight: 'clamp',
                  }),
                  transform: [
                    {
                      'translateY': this.state.mountAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [Dimensions.get('window').height * 0.3, 0],
                      }),
                    },
                  ],
                }}>
                <View paddingTop={32} paddingVertical={16}>
                  <StyledButton
                    secondary
                    onPress={this.state.registerFieldsShown ? this.onLoginPress : formik.handleSubmit}>
                    Log in
                  </StyledButton>
                </View>
                <View paddingVertical={16}>
                  <StyledButton
                    tertiary
                    onPress={!this.state.registerFieldsShown ? this.onRegisterPress : formik.handleSubmit}>
                    Register
                  </StyledButton>
                </View>
              </Animated.View>
            </View>
          )}
        </Formik>


      </Screen>
    )
  }
}

const mapStateToProps = (state: Store): MappedProps => {
  const mode = state.location.payload ?
    state.location.payload.mode :
    'login'
  return {
    mode,
  }
}

export default connect(mapStateToProps)(Onboarding)

