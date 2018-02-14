// @flow
import React, {PureComponent} from 'react'
import {View as RNView} from 'react-native'
import {connect} from 'react-redux'
import glamorous, {View} from 'glamorous-native'
import {Formik} from 'formik'

import {BackgroundImage, FStyledTextInput, Screen, StyledButton as Button, Text} from '../Components'
import BACKGROUND_IMAGE from './smoke-urban-bg.png'
import type {Store} from '../Store'
import {errorMessageForName} from '../Utils'
import {RegisterOverlay} from './RegisterOverlay'
import {StyledButton} from '../Components/Buttons/StyledButton'

type MappedProps = {}
type LoginScreenProps = ReduxProps<{}, MappedProps>
type State = {
  overlay: boolean,
  loginButtonLayout: ?{width: number, height: number, x: number, y: number},
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
    overlay: false,
    loginButtonLayout: null,
  }
  loginButtonContainer: ?StyledButton
  
  measureLoginButton = () => {
    setTimeout( () => {
      this.loginButtonContainer && this.loginButtonContainer.measure((fx, fy, width, height, px, py) => {
        this.setState({
          loginButtonLayout: {
            width,
            height,
            x: fx + px,
            y: fy + py,
          }
        })
      })
    }, 0)
  }
  
  onCreatePress = () => this.setState({overlay: true})
  
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
    const {overlay, loginButtonLayout} = this.state
    console.log(loginButtonLayout)
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
              onSubmit={() => {}}
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
                        alignError="right"
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
                        alignError="right"
                        name="password"
                        value={values.password}
                        errorMessage={errorMessageForName('password', errors, touched)}
                        onChange={setFieldValue}
                        onTouched={setFieldTouched}/>
                    </View>
                  </InputsContainer>
                  <ButtonsContainer>
                    <RNView
                      onLayout={this.measureLoginButton}
                      ref={comp => this.loginButtonContainer = comp}
                      style={{marginVertical: 8}}>
                      <Button
                        raised={!overlay}
                        onPress={handleSubmit}>
                        Log in
                      </Button>
                    </RNView>
                    <View>
                      <Button
                        small secondary
                        color="transparent"
                        onPress={this.onCreatePress}>
                        Create account
                      </Button>
                    </View>
                  
                  </ButtonsContainer>
                </View>
              )}
            </Formik>
            
            <RegisterOverlay
              visible={overlay}
              close={() => this.setState({overlay: false})}
              startLayout={loginButtonLayout}/>
            
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
