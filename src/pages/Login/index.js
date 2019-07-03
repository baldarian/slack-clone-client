import React from 'react';
import { Container, Header, Button, Form } from 'semantic-ui-react';
import { Formik } from 'formik';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo-hooks';
import { object } from 'yup';
import Input from '../../components/Input';
import { email, password } from '../../common/validation';
import { handleSubmit } from './../../common/validation';

const schema = object().shape({
  email,
  password
});

const Login = props => {
  const login = useMutation(LOGIN);

  return (
    <Container text>
      <Header as="h2">Login</Header>

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={schema}
        onSubmit={handleSubmit(async values => {
          const response = await login({ variables: values });

          const { accessToken, refreshToken } = response.data.login;

          localStorage.setItem('access_token', accessToken);
          localStorage.setItem('refresh_token', refreshToken);

          props.history.push('/');
        })}
      >
        {({ handleSubmit, errors }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <Input fluid name="email" placeholder="Email" />

              <Input
                fluid
                name="password"
                type="password"
                placeholder="Password"
              />

              <Button type="submit">Submit</Button>
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
};

const LOGIN = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
      refreshToken
    }
  }
`;

export default Login;
