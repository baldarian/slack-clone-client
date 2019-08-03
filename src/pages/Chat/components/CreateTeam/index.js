import React from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';
import { Formik } from 'formik';
import { useMutation } from 'react-apollo-hooks';
import { object } from 'yup';
import Input from 'components/Input';
import { team, handleSubmit } from 'common/validation';
import { GET_TEAMS, CREATE_TEAM } from 'graphql/team';

const schema = object().shape({
  name: team
});

const CreateTeam = ({ open, onClose }) => {
  const createTeam = useMutation(CREATE_TEAM, {
    update: (cache, { data }) => {
      const { teams } = cache.readQuery({ query: GET_TEAMS });

      cache.writeQuery({
        query: GET_TEAMS,
        data: { teams: [...teams, data.createTeam] }
      });
    }
  });

  return (
    <Modal closeIcon size="mini" open={open} onClose={onClose}>
      <Modal.Header>Create Team</Modal.Header>
      <Modal.Content>
        <Formik
          initialValues={{ name: '' }}
          validationSchema={schema}
          onSubmit={handleSubmit(async values => {
            await createTeam({ variables: values });

            onClose();
          })}
        >
          {({ handleSubmit, errors }) => (
            <Form onSubmit={handleSubmit}>
              <Input fluid name="name" placeholder="Name" />

              <Button type="submit" fluid>
                Create
              </Button>
            </Form>
          )}
        </Formik>
      </Modal.Content>
    </Modal>
  );
};

export default CreateTeam;
