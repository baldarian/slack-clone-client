import React from 'react';
import { Header, Form } from 'semantic-ui-react';
import { Formik } from 'formik';
import { useMutation } from 'react-apollo-hooks';
import { object } from 'yup';
import { toast } from 'react-toastify';
import Input from '../../components/Input';
import {
  username,
  email,
  password,
  handleSubmit
} from '../../common/validation';
import { REGISTER } from '../../graphql/user';
import {
  Container,
  Wrapper,
  Logo,
  BlueButton,
  BlueLink
} from '../../styled-components/auth.js';
import logo from '../../assets/logo.png';

const schema = object().shape({
  username,
  email,
  password
});

const Register = ({ history }) => {
  const register = useMutation(REGISTER);

  return (
    <Container>
      <div>
        <Wrapper>
          <Header as="h2">
            <Logo src={logo} />
          </Header>

          <Formik
            initialValues={{ username: '', email: '', password: '' }}
            validationSchema={schema}
            onSubmit={handleSubmit(async values => {
              await register({ variables: values });

              toast.success("You've successfully registered");

              history.push('/');
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

                <BlueButton fluid type="submit">
                  Sign up
                </BlueButton>
              </Form>
            )}
          </Formik>
        </Wrapper>

        <Wrapper mt="3">
          Have an account? <BlueLink to="/login">Log in</BlueLink>
        </Wrapper>
      </div>
    </Container>
  );
};

export default Register;
