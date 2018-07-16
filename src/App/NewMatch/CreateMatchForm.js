// @flow
import * as React from 'react'
import type {FormikBag} from 'formik'
import {withFormik} from 'formik'
import {FTextInput, Screen, SystemView as View, Button} from 'nativesystem'
import {Text} from '../../Components'
import type {CreateMatchValues} from './Saga'

type Props = {
  ...FormikBag,
  ...CreateMatchValues,
}
type State = {}
class CreateMatchForm extends React.Component<Props> {
  render() {
    const {name, description, members, isPrivate, setFieldValue} = this.props
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
              value={name}
              onChange={setFieldValue}/>
          </View>
          <View my={2}>
            <Text>Description</Text>
            <FTextInput
              name="description"
              value={description}
              onChange={setFieldValue}/>
          </View>
          <View my={2}>
            <Text>Members</Text>
            <FTextInput
              name="members"
              value={members}
              onChange={setFieldValue}/>
            <Text modifier="small" color="sonicSilver">
              Enter members' usernames split by commas
            </Text>
          </View>
          <View mt={2} w={200} as="center" mb={4}>
            <Button
              color="frenchSky" raised={20} ripple="white">
              <Text color="white">
                Create!
              </Text>
            </Button>
          </View>
        </View>
      </Screen>
    )
  }
}

const FCreateMatchForm = withFormik({
  mapPropsToValues: () => ({}),
  handleSubmit: () => {
  
  },
})(CreateMatchForm)

export {FCreateMatchForm as CreateMatchForm}
