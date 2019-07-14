import React from 'react';
import { Header, Form } from 'semantic-ui-react';
import { Formik } from 'formik';
import { useMutation } from 'react-apollo-hooks';
import { object } from 'yup';

import Input from '../../components/Input';
import { email, password, handleSubmit } from '../../common/validation';
import logo from '../../assets/logo.png';
import { LOGIN } from '../../graphql/user';
import {
  Container,
  Wrapper,
  Logo,
  BlueButton,
  BlueLink
} from '../../styled-components/auth.js';

const schema = object().shape({
  email,
  password
});

const Login = ({ history }) => {
  const login = useMutation(LOGIN);

  return (
    <Container>
      <div>
        <Wrapper>
          <Header as="h2">
            <Logo src={logo} />
          </Header>

          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={schema}
            onSubmit={handleSubmit(async values => {
              const response = await login({ variables: values });

              const { accessToken, refreshToken } = response.data.login;

              localStorage.setItem('access_token', accessToken);
              localStorage.setItem('refresh_token', refreshToken);

              history.push('/');
            })}
          >
            {({ handleSubmit, errors }) => (
              <Form onSubmit={handleSubmit}>
                <Input fluid name="email" placeholder="Email" />
                <Input
                  fluid
                  name="password"
                  type="password"
                  placeholder="Password"
                />
                <BlueButton type="submit" fluid>
                  Log in
                </BlueButton>
              </Form>
            )}
          </Formik>
        </Wrapper>

        <Wrapper mt="3">
          Don't have an account? <BlueLink to="/register">Sign up</BlueLink>
        </Wrapper>
      </div>
    </Container>
  );
};

export default Login;
