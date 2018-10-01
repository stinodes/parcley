// @flow
import * as React from "react";
import type { FormikBag } from "formik";
import { withFormik, Field } from "formik";
import {
  Screen,
  SystemView as View,
  Button,
  KeyboardAnimatedView,
  Spinner
} from "nativesystem";
import { FTextInput, Text } from "../../Components";
import type { CreateOrderValues } from "./Saga";
import { connect } from "react-redux";
import { createOrder, isPending, isSuccessful } from "./Redux";

type Props = {
  ...FormikBag,
  onSuccess: () => any
};
type MappedProps = {
  isPending: boolean,
  isSuccessful: boolean
};

type State = {};
class CreateOrderForm extends React.Component<ReduxProps<Props, MappedProps>> {
  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.isSubmitting &&
      prevProps.isPending !== this.props.isPending &&
      !this.props.isPending
    ) {
      if (this.props.isSuccessful) this.onSuccess();
      else this.props.setSubmitting(false);
    }
  }

  onSuccess() {
    console.log("on success");
    this.props.resetForm({
      name: "",
      description: "",
      members: "",
      isPrivate: false
    });
    this.props.onSuccess && this.props.onSuccess();
  }

  render() {
    const { setFieldValue, handleSubmit, isSubmitting, values } = this.props;
    return (
      <Screen dismissKeyboardOnTap color="white">
        <View px={3}>
          <View py={2}>
            <Text modifier="large" bold color="black">
              Or create a order
            </Text>
          </View>

          <View>
            <Field
              component={FTextInput}
              baseColor="black"
              label="Order name"
              accentColor="gunMetal"
              name="name"
            />
          </View>
          <View>
            <Field
              component={FTextInput}
              baseColor="black"
              accentColor="gunMetal"
              label="Description"
              name="description"
            />
          </View>
          <View>
            <Field
              component={FTextInput}
              baseColor="black"
              label="Members"
              accentColor="gunMetal"
              autoCapitalize="none"
              name="members"
              title="Enter members' usernames split by commas"
            />
          </View>
          <View mt={2} w={200} as="center" mb={4}>
            <Button
              onPress={handleSubmit}
              color="gunMetal"
              raised={20}
              ripple="white"
            >
              {isSubmitting ? (
                <Spinner color="white" />
              ) : (
                <Text color="white">Create!</Text>
              )}
            </Button>
          </View>
        </View>
        <KeyboardAnimatedView />
      </Screen>
    );
  }
}

const FormikCreateOrderForm = withFormik({
  mapPropsToValues: () => ({
    name: "",
    description: "",
    members: "",
    isPrivate: false
  }),
  validate: values => {
    const errors = {};
    if (!values.name) errors.name = "Name is required";
    return errors;
  },
  handleSubmit: (values: CreateOrderValues, { props }) =>
    props.dispatch(createOrder(values))
})(CreateOrderForm);

const mapStateToProps = (state): MappedProps => ({
  isPending: isPending(state),
  isSuccessful: isSuccessful(state)
});
const ConnectedFormikCreateOrderForm = connect(mapStateToProps)(
  FormikCreateOrderForm
);

export { ConnectedFormikCreateOrderForm as CreateOrderForm };
