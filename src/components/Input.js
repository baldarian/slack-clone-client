import React from 'react';
import { Input, Message, Form } from 'semantic-ui-react';
import { Field, ErrorMessage } from 'formik';

const FormInput = props => (
  <Field {...props} name={props.name}>
    {({ field, form }) => (
      <>
        <Form.Input
          error={form.touched[field.name] && !!form.errors[field.name]}
        >
          <Input {...field} {...props} />
        </Form.Input>
        <ErrorMessage name={props.name}>
          {message => <Message color="red">{message}</Message>}
        </ErrorMessage>
      </>
    )}
  </Field>
);

export default FormInput;
