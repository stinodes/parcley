// @flow
import * as React from 'react'
import type {FormikBag} from 'formik'
import {withFormik} from 'formik'
import g from 'glamorous-native'
import Icon from 'react-native-vector-icons/Feather'
import {Button, Screen, Spinner, SystemView as View, text} from 'nativesystem'

import {Text, FTextInput} from '../../Components'
import {isPending, isSuccessful, joinMatch} from './Redux'
import {connect} from 'react-redux'

const GIcon = g(Icon)(text, {fontSize: 34})

type Props = {
  ...FormikBag,
  close: () => any,
  onSubmit: () => any,
}
type MappedProps = {
  isPending: boolean,
  isSuccessful: boolean,
}
type State = {}

class JoinMatchForm extends React.Component<ReduxProps<Props, MappedProps>> {
  
  componentDidUpdate(prevProps, prevState) {
    if (this.props.isSubmitting && prevProps.isPending !== this.props.isPending && !this.props.isPending) {
      console.log('success?', this.props.isSuccessful)
      if (this.props.isSuccessful)
        this.onSuccess()
      else
        this.props.setSubmitting(false)
    }
  }
  
  onSuccess() {
    this.props.resetForm({})
    this.props.onSuccess && this.props.onSuccess()
  }
  
  render() {
    const {values, setFieldValue, handleSubmit, close, isSubmitting} = this.props
    return (
      <Screen dismissKeyboardOnTap>
        <View mt={2} px={3}>
          <Text modifier="large" bold>
            Join a match
          </Text>
        </View>
        <View f={1} pt={1} px={3}>
          <FTextInput
            autoCapitalize="none"
            accentColor="frenchSky"
            name="code"
            value={values.code}
            placeholder="Match code"
            onChange={setFieldValue}/>
        </View>
        {isSubmitting ?
          <View pb={3} pt={2} fd="row" jc="center">
            <Spinner size="large" color="frenchSky"/> :
          </View> :
          <View pb={2} pt={1} fd="row" jc="center">
      
            <View mr={1}>
              <Button color="white" ripple="error" onPress={close}>
                <GIcon name="x" color="error"/>
              </Button>
            </View>
            <View ml={1}>
              <Button color="white" ripple="frenchSky" onPress={handleSubmit}>
                <GIcon name="check" color="frenchSky"/>
              </Button>
            </View>
          </View>
        }
      </Screen>
    )
  }
}

const FormikJoinMatchForm = withFormik({
  mapPropsToValues: () => ({code: ''}),
  validate: (values) => {
    const errors = {}
    if (!values.code)
      errors.name = 'Match code is required'
    return errors
  },
  handleSubmit:
    (values, {props}) =>
      props.dispatch(
        joinMatch(values)
      ),
})(JoinMatchForm)

const mapStateToProps = (state): MappedProps => ({
  isPending: isPending(state),
  isSuccessful: isSuccessful(state),
})
const ConnectedFormikJoinMatchForm  = connect(mapStateToProps)(FormikJoinMatchForm)

export {ConnectedFormikJoinMatchForm as JoinMatchForm}