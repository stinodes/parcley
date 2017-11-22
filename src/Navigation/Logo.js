// @flow
import React from 'react'
import glamorous from 'glamorous-native'

const Container = glamorous.view({
  padding: 10,
  paddingTop: 0,
})
const Logo = glamorous.view({
  width: 60,
  height: 60,
  borderRadius: 30,
  elevation: 3,
}, ({theme, dark}) => ({
  backgroundColor: theme.colors['eerie-black'],
}))

export default (props : {dark? : boolean}) => <Container><Logo {...props}/></Container>