// @flow
import * as React from 'react'
import {Button, FTextInput, KeyboardAnimatedView, Screen, SystemView as View, textColor, Base} from 'nativesystem'
import {withFormik} from 'formik'
import Icon from 'react-native-vector-icons/MaterialIcons'
import g from 'glamorous-native'
import * as firebase from 'firebase'
import {MessageBarManager} from 'react-native-message-bar'

import {Text} from '../Components'
import type {FormikBag} from 'formik'
import {createError, createMessage} from '../Utils/messageBar'

const GIcon = g(Icon)(textColor)

type Props = {
  ...FormikBag,
  close: () => any,
}

class LoginForm extends React.Component<Props> {
  render() {
    const {setFieldValue, values: {email, password}, handleSubmit, submitting} = this.props
    return (
      <Screen
        dismissKeyboardOnTap
        color="ufoGreen" f={1}
        statusBarStyle="dark-content"
        statusBarColor="ufoGreen">
        <View f={1} jc="center" px={3}>
          <View my={2}>
            <Text modifier="large" bold color="white">Welcome back!</Text>
          </View>
          <View my={2}>
            <Text modifier="small" color="white">
              E-mail address
            </Text>
            <FTextInput
              name="email"
              value={email}
              onChange={setFieldValue}
              color="white"
              underlineColorAndroid="white"/>
          </View>
          <View my={2}>
            <Text modifier="small" color="white">
              Password
            </Text>
            <FTextInput
              secureTextEntry
              name="password"
              value={password}
              onChange={setFieldValue}
              color="white"
              underlineColorAndroid="white"/>
          </View>
          <View w={200} as="center" mt={2}>
            <Button
              color="white" ripple="ufoGreen" raised={20}
              onPress={handleSubmit}>
              <Text color="ufoGreen" bold>Log In</Text>
            </Button>
          </View>
          <View as="center" mt={3}>
            <Base
              background={Base.Ripple('white', true)}
              onPress={Base.delayHandler(this.props.close)}>
              <View w={64} h={64} jc="center" ai="center">
                <GIcon name="close" color="white" size={40}/>
              </View>
            </Base>
          </View>
          <KeyboardAnimatedView/>
        </View>
      </Screen>
    )
  }
}

const FormikLoginForm = withFormik({
  mapPropsToValues: props => ({email: '', password: ''}),
  handleSubmit: async (values, {props, setSubmitting}) => {
    setSubmitting(true)
    try {
      const auth = firebase.auth()
      await auth.signInWithEmailAndPassword(values.email, values.password)
      const user = auth.currentUser
      props.close()
      console.log(user)
    }
    catch(e) {
      console.log(e)
      createError({
        title: e.message,
      })
    }
    setSubmitting(false)
  }
})(LoginForm)

export {FormikLoginForm as LoginForm}
