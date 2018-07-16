// @flow
import * as React from 'react'
import {StatusBar} from 'react-native'
import {Screen} from 'nativesystem'
import {Modal} from './Modal'

type Props = {
  onRequestClose: () => any,
  visible: boolean,
  
  useNativeDriver?: boolean,
  onShow?: () => any,
  onShowEnd?: () => any,
  onHide?: () => any,
  onHideEnd?: () => any,
  onAnimate?: (value: number) => any,
  
  children: React.Node,
  
  color?: string,
  statusBarStyle?: | 'dark-content' | 'light-content',
  invertStatusBarStyle?: boolean,
  statusBarColor?: string,
  dismissKeyboardOnTap?: boolean,
  ignoredTargets?: () => React.Node[],
  screenProps?: {},
}
type State = {
  isShown: boolean
}

class FullscreenModal extends React.Component<Props, State> {
  state = {
    isShown: false,
  }
  static getDerivedStateFromProps(props: Props, state: State) {
    if (state.isShown && !props.visible)
      return {isShown: false}
    return null
  }
  onModalAnimate = (value: number) => {
    if (value >= 1 && !this.state.isShown && this.props.visible)
      this.setState({isShown: true})
    this.props.onAnimate && this.props.onAnimate(value)
  }
  
  get statusBarStyle(): ?'light-content'|'dark-content' {
    const {statusBarStyle, invertStatusBarStyle} = this.props
    const {isShown} = this.state
    if (!statusBarStyle)
      return undefined
    if (isShown && invertStatusBarStyle) {
      if (statusBarStyle === 'dark-content')
        return 'light-content'
      return 'dark-content'
    }
    return statusBarStyle
  }
  
  render() {
    const {
      children, color,
      statusBarColor,
      statusBarStyle,
      screenProps,
      ...props
    } = this.props
    const {isShown} = this.state
    return (
      <Modal
        onAnimate={this.onModalAnimate}
        {...props}>
        <Screen
          statusBarColor={isShown ? statusBarColor : undefined}
          statusBarStyle={isShown ? statusBarStyle : undefined}
          color={color} f={1}
          {...screenProps}>
          {children}
        </Screen>
      </Modal>
    )
  }
}

export {FullscreenModal}
