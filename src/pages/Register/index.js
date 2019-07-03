import React from 'react';
import { Container, Header, Button, Form } from 'semantic-ui-react';
import { Formik } from 'formik';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo-hooks';
import { object } from 'yup';
import Input from '../../components/Input';
import {
  username,
  email,
  password,
  handleSubmit
} from '../../common/validation';

const schema = object().shape({
  username,
  email,
  password
});

const Register = props => {
  const register = useMutation(REGISTER);

  return (
    <Container text>
      <Header as="h2">Register</Header>

      <Formik
        initialValues={{ username: '', email: '', password: '' }}
        validationSchema={schema}
        onSubmit={handleSubmit(async values => {
          await register({ variables: values });

          props.history.push('/');
        })}
      >
        {({ handleSubmit, errors }) => (
          <Form onSubmit={handleSubmit}>
            <Input fluid name="username" placeholder="Username" />

            <Input fluid name="email" placeholder="Email" />

            <Input
              fluid
              name="password"
              type="password"
              placeholder="Password"
            />

            <Button type="submit">Submit</Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

const REGISTER = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password)
  }
`;

export default Register;
