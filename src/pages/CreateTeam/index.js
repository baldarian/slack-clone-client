import React from 'react';
import { Container, Header, Button, Form } from 'semantic-ui-react';
import { Formik } from 'formik';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo-hooks';
import { object } from 'yup';
import Input from '../../components/Input';
import { team, handleSubmit } from '../../common/validation';

const schema = object().shape({
  name: team
});

const CreateTeam = props => {
  const createTeam = useMutation(CREATE_TEAM);

  return (
    <Container text>
      <Header as="h2">Create Team</Header>

      <Formik
        initialValues={{ name: '' }}
        validationSchema={schema}
        onSubmit={handleSubmit(async values => {
          const { data } = await createTeam({ variables: values });

          await new Promise(r => window.setTimeout(r, 1000));
          props.history.push(`/${data.createTeam.channels[0].conversation.id}`);
        })}
      >
        {({ handleSubmit, errors }) => (
          <Form onSubmit={handleSubmit}>
            <Input fluid name="name" placeholder="Name" />

            <Button type="submit">Submit</Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

const CREATE_TEAM = gql`
  mutation($name: String!) {
    createTeam(name: $name) {
      id
      channels {
        id
        conversation {
          id
        }
      }
    }
  }
`;

export default CreateTeam;
