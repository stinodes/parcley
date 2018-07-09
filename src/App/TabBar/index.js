// @flow
import * as React from 'react'
import g from 'glamorous-native'
import {SystemView as View, text, Button, space, Base} from 'nativesystem'
import Icon from 'react-native-vector-icons/Feather'

const GIcon = g(Icon)(text, {fontSize: 28})

export const TabBarIcon = ({focused, name, color}: {focused: boolean, name: string, color: string}) =>
  <GIcon name={name} color={focused ? color : 'sonicSilver'}/>
export const createTabBarIcon = (name: string, color: string) => (props: {focused: boolean}) => <TabBarIcon {...props} color={color} name={name}/>

export const TabBarButton = ({color, ...props}: {color: string}) =>
  <Base {...props} background={Base.Ripple(color, true)}/>
export const createTabBarButton = (color: string) => (props: {}) =>
  <TabBarButton {...props} color={color}/>
