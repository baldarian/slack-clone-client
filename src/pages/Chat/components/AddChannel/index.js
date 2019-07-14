import React from 'react';
import gql from 'graphql-tag';
import { Modal, Form, Button } from 'semantic-ui-react';
import { Formik } from 'formik';
import { object } from 'yup';
import { useMutation } from 'react-apollo-hooks';

import { channel, handleSubmit } from 'common/validation';
import Input from 'components/Input';
import { GET_TEAMS } from 'graphql/team';

const schema = object().shape({
  name: channel
});

const AddChannel = ({ open, onClose, teamId }) => {
  const createChannel = useMutation(CREATE_CHANNEL, {
    update: (cache, { data }) => {
      const { teams } = cache.readQuery({ query: GET_TEAMS });

      const newTeams = teams.map(team =>
        team.id === teamId
          ? { ...team, channels: [...team.channels, data.createChannel] }
          : team
      );

      cache.writeQuery({
        query: GET_TEAMS,
        data: { teams: newTeams }
      });
    }
  });

  return (
    <Modal closeIcon size="mini" open={open} onClose={onClose}>
      <Modal.Header>Add Channel</Modal.Header>
      <Modal.Content>
        <Formik
          initialValues={{ name: '' }}
          validationSchema={schema}
          onSubmit={handleSubmit(async values => {
            await createChannel({
              variables: { name: values.name, teamId }
            });

            onClose();
          })}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <Input fluid name="name" placeholder="Name" />

              <Form.Field>
                <Button fluid>Create Channel</Button>
              </Form.Field>
            </Form>
          )}
        </Formik>
      </Modal.Content>
    </Modal>
  );
};

const CREATE_CHANNEL = gql`
  mutation($teamId: ID!, $name: String!) {
    createChannel(teamId: $teamId, name: $name) {
      id
      name
      conversation {
        id
        channelId
      }
    }
  }
`;

export default AddChannel;
