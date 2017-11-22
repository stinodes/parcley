// @flow
import React from 'react'
import {
  StyleSheet,
  StatusBar,
  Dimensions,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import glamorous, { withTheme } from 'glamorous-native'
import { tint, transparentize } from 'polished'

type Props = {
  children : Node,
  light? : boolean,
  theme : Object,
}

const { View } = glamorous

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
})
const ContentContainer = glamorous.view({
  position: 'absolute',
  top: 0, left: 0, right: 0, bottom: 0,
})
const Screen = (props : Props) => {
  const color = props.theme.base.primary
  return  (
    <View
      flex={1}
      backgroundColor={color}>
        <StatusBar
          backgroundColor={color}/>
        <Ripple
          num={5}
          size={Dimensions.get('window').width * 2}
          color={tint(0.4, color)}/>
        <ContentContainer>
          {props.children}
        </ContentContainer>
    </View>
  )
}

type RippleProps = {
  num: number,
  color: string,
  size: number,
}
type RipplePartProps = {
  i: number,
  num: number,
  color: string,
  size: number,
}
const StyledRipplePart = glamorous.view({
  alignItems: 'center',
  justifyContent: 'center',
}, ({size, color}) => ({
  width: size,
  height: size,
  borderRadius: size * 0.5,
  backgroundColor: color,
}))
const RippleContainer = glamorous.view({
  position: 'absolute',
  top: 0, left: 0, right: 0, bottom: 0,
  alignItems: 'center',
  justifyContent: 'center',
})

const RipplePart = ({i, num, size, color} : RipplePartProps) => {
  return (
    <StyledRipplePart
      size={i / num * size}
      color={transparentize(i / num, color)}>
      {
        i > 0 &&
          <RipplePart
            size={size}
            num={num}
            color={color}
            i={i-1}/>
      }
    </StyledRipplePart>
  )
}
const Ripple = (props : RippleProps) => {
  return <RippleContainer>
    <RipplePart {...props} i={props.num}/>
  </RippleContainer>
}

export default withTheme(Screen)
