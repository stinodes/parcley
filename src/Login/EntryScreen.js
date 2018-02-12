// @flow
import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import glamorous, {View} from 'glamorous-native'

import {BackgroundImage, FStyledTextInput, Screen, StyledButton as Button, Text} from '../Components'
import BACKGROUND_IMAGE from './smoke-urban-bg.png'

import type {Store} from '../Store'
import {Formik} from 'formik'
import {errorMessageForName} from '../Utils'

type MappedProps = {}
type LoginScreenProps = ReduxProps<{}, MappedProps>
type State = {
  loginModal: boolean,
}

const ButtonsContainer = glamorous(View)({
  paddingHorizontal: 32,
  justifyContent: 'center',
})
const InputsContainer = glamorous(View)({
  paddingHorizontal: 32,
  justifyContent: 'center',
})

class EntryScreen extends PureComponent<LoginScreenProps, State> {
  state = {
    loginModal: false,
  }
  
  
  onLoginPress = () => this.setState({loginModal: true})
  onLoginClose = () => this.setState({loginModal: false})
  onCreatePress = () => {
  }
  
  validate = (values) => {
    const errors = {}
    if (!values.email) {
      errors.email = 'Please enter an e-mail address.'
    }
    else if (!/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(values.email)) {
      errors.email = 'Your email seems to be invalid.'
    }
    if (!values.password) {
      errors.password = 'Please enter a password.'
    }
    return errors
  }
  
  render() {
    const {loginModal} = this.state
    return (
      <Screen dismissKeyboardOnTap>
        <BackgroundImage source={BACKGROUND_IMAGE}>
          <View flex={1} justifyContent="space-around">
            <View flex={0.4} justifyContent="center">
              <Text title faded align="center">
                C o o l i o
              </Text>
            </View>
            
            <Formik
              validate={this.validate}
              initialValues={{email: '', password: '',}}>
              {({setFieldValue, setFieldTouched, values, errors, touched, handleSubmit}) => (
                <View flex={0.6}>
                  <InputsContainer>
                    <View marginTop={8}>
                      <Text small faded>
                        E-mail address
                      </Text>
                      <FStyledTextInput
                        useErrorColor
                        name="email"
                        value={values.email}
                        errorMessage={errorMessageForName('email', errors, touched)}
                        onChange={setFieldValue}
                        onTouched={setFieldTouched}/>
                    </View>
                    <View marginTop={8}>
                      <Text small faded>
                        Password
                      </Text>
                      <FStyledTextInput
                        secureTextEntry
                        useErrorColor
                        name="password"
                        value={values.password}
                        errorMessage={errorMessageForName('password', errors, touched)}
                        onChange={setFieldValue}
                        onTouched={setFieldTouched}/>
                    </View>
                  </InputsContainer>
                  <ButtonsContainer>
                    <View marginVertical={8}>
                      <Button
                        raised
                        onPress={handleSubmit}>
                        Log in
                      </Button>
                    </View>
                    <View>
                      <Button
                        small secondary raised
                        color="transparent"
                        onPress={this.onCreatePress}>
                        Create account
                      </Button>
                    </View>
                  
                  </ButtonsContainer>
                </View>
              )}
            </Formik>
          </View>
        </BackgroundImage>
      </Screen>
    )
  }
}

const mapStateToProps = (state: Store): MappedProps => ({})

const ConnectedEntryScreen = connect(mapStateToProps)(EntryScreen)
// $FlowFixMe
ConnectedEntryScreen.navigationOptions = {
  header: null,
}

export {ConnectedEntryScreen as EntryScreen}
