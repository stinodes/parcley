// @flow
import * as React from 'react'
import type {FormikBag} from 'formik'
import {withFormik} from 'formik'
import {FTextInput, Screen, SystemView as View, Button, KeyboardAnimatedView, Spinner} from 'nativesystem'
import {Text} from '../../Components'
import type {CreateMatchValues} from './Saga'
import {connect} from 'react-redux'
import {createMatch, isPending, isSuccessful} from './Redux'

type Props = {
  ...FormikBag,
  onSuccess: () => any,
}
type MappedProps = {
  isPending: boolean,
  isSuccessful: boolean,
}

type State = {}
class CreateMatchForm extends React.Component<ReduxProps<Props, MappedProps>> {
  
  componentDidUpdate(prevProps, prevState) {
    if (this.props.isSubmitting && prevProps.isPending !== this.props.isPending && !this.props.isPending) {
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
    const {setFieldValue, handleSubmit, isSubmitting, values} = this.props
    return (
      <Screen
        dismissKeyboardOnTap
        color="white">
        <View px={3}>
          <View py={2}>
            <Text modifier="large" bold>
              Or create a match
            </Text>
          </View>
          
          <View my={2}>
            <Text>Match name</Text>
            <FTextInput
              name="name"
              value={values.name}
              onChange={setFieldValue}/>
          </View>
          <View my={2}>
            <Text>Description</Text>
            <FTextInput
              name="description"
              value={values.description}
              onChange={setFieldValue}/>
          </View>
          <View my={2}>
            <Text>Members</Text>
            <FTextInput
              autoCapitalize="none"
              name="members"
              value={values.members}
              onChange={setFieldValue}/>
            <Text modifier="small" color="sonicSilver">
              Enter members' usernames split by commas
            </Text>
          </View>
          <View mt={2} w={200} as="center" mb={4}>
            <Button
              onPress={handleSubmit}
              color="frenchSky" raised={20} ripple="white">
              {isSubmitting ?
                <Spinner color="white"/> :
                <Text color="white">
                  Create!
                </Text>
              }
            </Button>
          </View>
        </View>
        <KeyboardAnimatedView/>
      </Screen>
    )
  }
}

const FormikCreateMatchForm = withFormik({
  mapPropsToValues: () => ({name: '', description: '', members: '', isPrivate: false}),
  validate: (values) => {
    const errors = {}
    if (!values.name)
      errors.name = 'Name is required'
    return errors
  },
  handleSubmit:
    (values: CreateMatchValues, {props}) =>
      props.dispatch(
        createMatch(values)
      ),
})(CreateMatchForm)

const mapStateToProps = (state): MappedProps => ({
  isPending: isPending(state),
  isSuccessful: isSuccessful(state),
})
const ConnectedFormikCreateMatchForm = connect(mapStateToProps)(FormikCreateMatchForm)

export {ConnectedFormikCreateMatchForm as CreateMatchForm}
