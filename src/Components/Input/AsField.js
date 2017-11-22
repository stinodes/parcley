// @flow
import React from 'react'

import type { ComponentType } from 'react'
import type { FormikProps, FieldObject, FormikTouched, FormikErrors } from 'formik'

// type Props = {
//   input : typeof fieldInputPropTypes,
//   meta : typeof fieldMetaPropTypes
// }
// const asField = (Component : ComponentType<*>) =>
//   ({input, meta, ...props} : Props) => {
//     const error = (meta.touched) && meta.error
//     return (<Component {...input} {...meta} error={error} {...props}/>)
//   }

type FormikFormProps = FormikProps<any>
type MappedFieldProps =
  & FieldObject
  & {
    form: FormikFormProps,
    error: ?string,
  }
type FieldProps = {
  field: FieldObject,
  form: FormikFormProps,
}

function asField <ComponentProps : {}> (Component : ComponentType<MappedFieldProps & ComponentProps>) {
  return ({field, form, ...props}: FieldProps & ComponentProps) => {
    const componentProps : ComponentProps = props

    const error = form.touched && form.touched[field.name] && form.errors[field.name] ? form.errors[field.name] : null
    const mappedProps : MappedFieldProps = {
      ...field,
      form,
      error,
    }

    return <Component {...mappedProps} {...componentProps}/>
  }
}

export default asField
