// @flow
import React, {PureComponent} from 'react'
import glamorous, {withTheme} from 'glamorous-native'

import {Base} from './Base'
import {Text} from '../Text'
import {Spinner} from '../Spinner'
import {buttonColorFromTheme, buttonSizeFromTheme, colorFromTheme, elevationStyleFromRaised} from '../helpers'

import type {Node} from 'react'
import type {Props as TextProps} from '../Text'
import type {ColorProps, SizeProps, Theme, RaisedProps} from '../types'

const {View} = glamorous

const Container = glamorous.view({
  borderRadius: 5,
}, (props) => ({
  ...elevationStyleFromRaised(props),
}))
const StyledBase = glamorous(Base)({
  borderRadius: 5,
  paddingVertical: 12,
  paddingHorizontal: 16,
  justifyContent: 'center',
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: 'transparent',
}, ({theme, ...props}) => ({
  borderWidth: 3,
  borderColor: colorFromTheme(theme, props) || theme.base.primary,
  height: props.height,
}))

type Props =
  & ColorProps
  & SizeProps
  & RaisedProps
  & {
  onPress: (any) => any,
  bold?: boolean,
  border?: boolean,
  spinner?: boolean|'right',
  textColor?: string,

  children: Node,
  theme: Theme,
}

class BorderButtonComponent extends PureComponent<Props> {

  get color() {
    return colorFromTheme(this.props.theme, this.props) || this.props.theme.base.primary
  }

  get sizeTheme() {
    return buttonSizeFromTheme(this.props.theme, this.props)
  }

  get height() {
    return this.sizeTheme.height
  }

  get textProps(): TextProps {
    return {
      [this.sizeTheme.text]: true,
      color: colorFromTheme(this.props.theme, {color: this.props.textColor}) || this.color,
      align: 'center',
      bold: this.props.bold,
    }
  }

  render() {
    const {spinner, border, raised} = this.props
    return (
      <Container
        raised={raised}>
        <StyledBase
          {...this.props}
          containerStyle={{
            borderRadius: 5,
          }}
          border={border}
          background={Base.Ripple(this.color, true)}
          highlight={this.color}
          highlightOpacity={0.5}
          height={this.height}>
          <View>
            {spinner && spinner !== 'right' ?
              <Spinner color={this.textProps.color} large/> :
              <Text
                {...this.textProps}>
                {this.props.children}
              </Text>
            }
            {spinner && spinner === 'right' ?
              <View paddingHorizontal={8}>
                <Spinner color={this.textProps.color} small/>
              </View> : undefined
            }
          </View>
        </StyledBase>
      </Container>
    )
  }
}

const BorderButton = withTheme(BorderButtonComponent)
BorderButton.delayedHandler = Base.delayHandler
export {BorderButton}
