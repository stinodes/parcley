// @flow
import * as React from 'react';
import type { FormikBag } from 'formik';
import { withFormik } from 'formik';
import g from 'glamorous-native';
import {
  Button,
  Screen,
  Spinner,
  SystemView as View,
  text,
  Absolute,
} from 'nativesystem';

import { Text, FTextInput, Icon } from '../../Components';
import { isPending, isSuccessful, joinOrder } from './Redux';
import { connect } from 'react-redux';

type Props = {
  ...FormikBag,
  close: () => any,
  onSubmit: () => any,
};
type MappedProps = {
  isPending: boolean,
  isSuccessful: boolean,
};
type State = {};

class JoinOrderForm extends React.Component<ReduxProps<Props, MappedProps>> {
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
    this.props.resetForm({ code: '' });
    this.props.onSuccess && this.props.onSuccess();
  }

  render() {
    const {
      values,
      setFieldValue,
      handleSubmit,
      close,
      isSubmitting,
    } = this.props;
    return (
      <Screen dismissKeyboardOnTap>
        <View mt={2} px={3}>
          <Text modifier="large" bold>
            Join a order
          </Text>
        </View>
        <View f={1} pt={1} px={3}>
          <FTextInput
            autoCapitalize="none"
            accentColor="gunMetal"
            name="code"
            value={values.code}
            placeholder="Order code"
            onChange={setFieldValue}
          />
        </View>
        {isSubmitting ? (
          <View pb={3} pt={2} fd="row" jc="center">
            <Spinner size="large" color="gunMetal" />
          </View>
        ) : (
          <View pb={2} pt={1} fd="row" jc="center">
            <View>
              <Button color="gunMetal" ripple="white" onPress={handleSubmit}>
                <Text color="white">Join!</Text>
              </Button>
            </View>

            <Absolute b={2} r={1}>
              <Button color="white" ripple="gunMetal" onPress={close}>
                <Icon name="arrow-up" color="gunMetal" modifier="icon" />
              </Button>
            </Absolute>
          </View>
        )}
      </Screen>
    );
  }
}

const FormikJoinOrderForm = withFormik({
  mapPropsToValues: () => ({ code: '' }),
  validate: values => {
    const errors = {};
    if (!values.code) errors.name = 'Order code is required';
    return errors;
  },
  handleSubmit: (values, { props }) => props.dispatch(joinOrder(values)),
})(JoinOrderForm);

const mapStateToProps = (state): MappedProps => ({
  isPending: isPending(state),
  isSuccessful: isSuccessful(state),
});
const ConnectedFormikJoinOrderForm = connect(mapStateToProps)(
  FormikJoinOrderForm,
);

export { ConnectedFormikJoinOrderForm as JoinOrderForm };
