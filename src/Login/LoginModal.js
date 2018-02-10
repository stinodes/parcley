// @flow
import * as React from 'react'
import {Formik} from 'formik'
import {ScrollView, View} from 'glamorous-native'

import {CardModal, FTextInput} from '../Components'

type Props = {
  close: () => any,
  visible: boolean,
 }

class LoginModal extends React.PureComponent<Props> {
  
  emailInput: ?FTextInput
  passwordInput: ?FTextInput
  scrollView: ?ScrollView
  
  render() {
    const {close,visible} = this.props
    return (
      <CardModal onRequestClose={close} visible={visible} overlayColor="transparent">
        <Formik>
          {({values, setFieldValue}) => (
            <ScrollView
              horizontal
              pagingEnabled
              scrollEnabled={false}
              flex={1} alignSelf="stretch"
              ref={comp => this.scrollView = comp}>
              <View>
                <FTextInput
                  name="email" value={values.email} onChange={setFieldValue}
                  inputRef={comp => this.emailInput = comp}/>
              </View>
            </ScrollView>
          )}
        </Formik>
      </CardModal>
    )
  }
}

export {LoginModal}
