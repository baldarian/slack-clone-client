import React from 'react';
import { Modal, Form, Button } from 'semantic-ui-react';
import { Formik } from 'formik';
import { object } from 'yup';
import { useMutation } from 'react-apollo-hooks';

import { email, handleSubmit } from 'common/validation';
import Input from 'components/Input';
import { ADD_TEAM_MEMBER } from 'graphql/team';

const schema = object().shape({
  email
});

const InvitePeople = ({ open, onClose, teamId }) => {
  const addTeamMember = useMutation(ADD_TEAM_MEMBER);

  return (
    <Modal closeIcon size="mini" open={open} onClose={onClose}>
      <Modal.Header>Invite Poeple to the team</Modal.Header>
      <Modal.Content>
        <Formik
          initialValues={{ email: '' }}
          validationSchema={schema}
          onSubmit={handleSubmit(async values => {
            await addTeamMember({
              variables: { email: values.email, teamId }
            });

            onClose();
          })}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <Input fluid name="email" placeholder="E-mail" />

              <Form.Field>
                <Button fluid>Invite</Button>
              </Form.Field>
            </Form>
          )}
        </Formik>
      </Modal.Content>
    </Modal>
  );
};

export default InvitePeople;
