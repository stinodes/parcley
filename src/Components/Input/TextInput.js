// @flow
import React, { Component } from 'react'
import {
  TextInput as RNTextInput,
  Animated,
  StyleSheet,
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import glamorous, { withTheme } from 'glamorous-native'
import { transparentize } from 'polished'

import Text from '../Text'
import ButtonBase from '../Button/Base'

const ClonedText = glamorous.text({
  position: 'absolute',
  height: 0,
  textDecorationLine: 'none',
  opacity: 0,
}, ({theme, color, small, medium, large}) => {
  let size = theme.inputs.medium
  if (small)
    size = theme.inputs.small
  if (medium)
    size = theme.inputs.medium
  if (large)
    size = theme.inputs.large

  return {
    color,
    ...size
  }
})
const StyledTextInput = glamorous.textInput({
  height: 45,
  textDecorationLine: 'none'
}, ({theme, color, small, medium, large}) => {
  let size = theme.inputs.medium
  if (small)
    size = theme.inputs.small
  if (medium)
    size = theme.inputs.medium
  if (large)
    size = theme.inputs.large

  return {
    color,
    ...size
  }
})
const ErrorContainer = glamorous(Animated.View)({
  position: 'absolute',
  top: 2, left: 0,
  height: 40,
})

const FocusButton = glamorous(ButtonBase)({
  position: 'absolute',
  top: 0, left: 0, right: 0, bottom: 0,
})

const HelpButton = glamorous(ButtonBase)({
  position: 'absolute',
  bottom: 5, right: 5,
  height: 30,
  width: 30,
})
const Icon = glamorous(Ionicons)({
  textAlign: 'center',
  fontSize: 30,
  flex: 1,
}, ({color}) => ({
  color,
}))

const Container = glamorous.view({
  flexDirection: 'column',
})

const BorderContainer = glamorous.view({
  height: 2,
  backgroundColor: 'transparent',
})
const BorderPlaceholder = glamorous.view({
  position: 'absolute',
  left: 0, right: 0, bottom: 0,
  height: 3,
  borderRadius: 1,
}, ({color}) => ({
  backgroundColor: color,
}))

const BorderColoured = glamorous(Animated.View)({
  position: 'absolute',
  bottom: 0, left: 0,
  height: 3,
  borderRadius: 1,
  elevation: 1
}, ({color}) => ({
  backgroundColor: color,
}))

type Props = {
  primary? : boolean,
  secondary? : boolean,
  tertiary? : boolean,

  small? : boolean,
  medium? : boolean,
  large? : boolean,

  theme : Object,

  name: string,
  onChange: (e: any) => any,
  onBlur: (e: any) => any,
  value: any,
} & typeof TextInput.propTypes

type State = {|
  width: number,
  animation: Animated.Value,
  errorFade: Animated.Value,
  errorShown: boolean,
|}

class TextInput extends Component<Props, State> {

  state = {
    width: 0,
    animation: new Animated.Value(0),
    errorFade: new Animated.Value(0),
    errorShown: false,
  }

  showValidationIcon = 'ios-information-circle-outline'
  showHelpIcon = 'ios-help-circle-outline'
  closeIcon = 'ios-close-circle-outline'

  input : RNTextInput

  _onBlur = (...args) => {
    if (!!this.props.form) {
      this.props.form.setFieldTouched(this.props.name, true)
    }
    this.props.onBlur && this.props.onBlur(...args)
  }
  _onValueChange = (...args) => {
    if (!!this.props.form) {
      this.props.form.setFieldValue(this.props.name, ...args)
    }
    else {
      this.props.onChange(...args)
    }
  }

  _onTextSizeChange = (event) => {
    let width
    if (this.props.secureTextEntry) {
      width = this.props.value ?
        this.props.value.length * 8 : 0
    }
    else {
      width = event.nativeEvent.layout.width
    }
    if (width > 0)
      width += 8

    this.setState({width})
  }

  _animateBorder(toValue : number) {
    Animated.spring(
      this.state.animation,
      { toValue, }
    ).start()
  }

  _fadeError(toValue : number) {
    Animated.timing(
      this.state.errorFade,
      { toValue },
    ).start()
  }

  onHelpButtonPress = () => {
    if (this.props.error) {
      return this.setState({errorShown: !this.state.errorShown})
    }
  }

  focus = () => {
    this.input.focus()
  }

  get helpButton() {
    if (this.props.error) {
      if (this.state.errorShown) return this.closeIcon
      return this.showValidationIcon
    }
    if (this.props.help)
      return this.showHelpIcon
  }

  get inputTheme() {
    const { primary, secondary, tertiary, theme } = this.props
    if (primary)
      return theme.inputs.primary
    if (secondary)
      return theme.inputs.secondary
    if (tertiary)
      return theme.inputs.tertiary
    return theme.inputs.primary
  }
  get color() {
    return this.inputTheme.color
  }
  get placeholder() {
    return this.inputTheme.placeholder
  }

  componentDidUpdate(prevProps : Props, prevState : State) {
    if (prevState.width !== this.state.width)
      this._animateBorder(this.state.width)
  }

  render() {
    const { theme, onChange, ...props, } = this.props
    const ripple = ButtonBase.Ripple(this.color, true)

    const textInputProps = {
      ...props,
      onChangeText: this._onValueChange,
    }

    return (
      <Container>
        <Animated.View
          style={{opacity: this.state.errorFade.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0],
          })}}>

          <ClonedText
            small={props.small}
            medium={props.medium}
            large={props.large}
            onLayout={this._onTextSizeChange}>
            {this.props.value}
          </ClonedText>

          <StyledTextInput
            {...textInputProps}
            color={this.color}
            onBlur={this._onBlur}
            placeholderTextColor={this.placeholder}
            innerRef={(comp) => this.input = comp}
            selectionColor={theme.colors['wintergreen-dream']}
            underlineColorAndroid="transparent"/>
        </Animated.View>

        <ErrorContainer
          style={{opacity: this.state.errorFade}}>
          <Text
            small
            color="intense-orange">
            {this.props.error}
          </Text>
        </ErrorContainer>

        <FocusButton
          background={ripple}
          onPress={this.focus}/>

        { !!this.helpButton &&
        <HelpButton
          background={ripple}
          onPress={this.onHelpButtonPress}>
          <Icon name={this.helpButton} color={this.color}/>
        </HelpButton>
        }

          <BorderPlaceholder
            color={this.placeholder}/>
          <BorderColoured
            color={this.color}
            style={{ width: this.state.animation }}/>
      </Container>
    )
  }
}

export default withTheme(TextInput)
