// @flow
import * as React from 'react'
import type {FormikBag} from 'formik'
import {withFormik} from 'formik'
import {Button, FTextInput, Screen, SystemView as View} from 'nativesystem'
import {Text} from '../../Components'

type FormValues = {
  name: string,
}
type Props = {
  ...FormikBag,
  ...FormValues,
}
type State = {}

class JoinMatchForm extends React.Component<Props> {
  render() {
    const {name, setFieldValue} = this.props
    return (
      <Screen>
        <View mt={2} px={3}>
          <Text modifier="large" bold>
            Join a match
          </Text>
        </View>
        <View fd="row" p={3}>
          <View f={1} mr={2}>
            <FTextInput
              name="name"
              value={name}
              onChange={setFieldValue}/>
          </View>
          <Button color="frenchSky" raised={20} ripple="white">
            <Text color="white">
              Join
            </Text>
          </Button>
        </View>
      </Screen>
    )
  }
}

const FJoinMatchForm = withFormik({})(JoinMatchForm)

export {FJoinMatchForm as JoinMatchForm}