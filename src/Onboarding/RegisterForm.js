// @flow
import * as React from 'react'
import * as firebase from 'firebase'
import {Keyboard} from 'react-native'
import {
  Button, FTextInput, KeyboardAnimatedView, Screen, subTheme, SystemView as View, textColor, Base,
  Spinner
} from 'nativesystem'
import {withFormik} from 'formik'
import Icon from 'react-native-vector-icons/MaterialIcons'
import g from 'glamorous-native'

import {Text} from '../Components'
import type {FormikBag} from 'formik'

const GIcon = g(Icon)(textColor)

type Props = {
  ...FormikBag,
  close: () => any,
}

class RegisterForm extends React.Component<Props> {
  render() {
    const {setFieldValue, values: {email, password}, handleSubmit, isSubmitting} = this.props
    return (
      <Screen
        dismissKeyboardOnTap
        color="frenchSky" f={1}
        statusBarStyle="dark-content"
        statusBarColor="frenchSky">
        <View f={1} jc="center" px={3}>
          <View my={2}>
            <Text modifier="large" bold color="white">
              Hi there friend!
            </Text>
            <Text color="white">
              Who are you?
            </Text>
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
              color="white" ripple="frenchSky" raised={20}
              onPress={handleSubmit}>
              {isSubmitting ?
                <Spinner color="frenchSky"/>:
                <Text color="frenchSky" bold>Sign Up</Text>
              }
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

const FormikRegisterForm = withFormik({
  mapPropsToValues: props => ({email: '', password: ''}),
  handleSubmit: async (values, {props, setSubmitting}) => {
    setSubmitting(true)
    try {
      const auth = firebase.auth()
      await auth.createUserWithEmailAndPassword(values.email, values.password)
      const user = auth.currentUser
      props.close()
      console.log(user)
    }
    catch(e) {
      console.log(e)
    }
    setSubmitting(false)
    props.close()
  }
})(RegisterForm)

export {FormikRegisterForm as RegisterForm}
