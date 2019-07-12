import gql from 'graphql-tag';

export const CREATE_MESSAGE = gql`
  mutation($conversationId: ID!, $text: String!) {
    createMessage(conversationId: $conversationId, text: $text) {
      id
      text
    }
  }
`;

export const GET_MESSAGES = gql`
  query($conversationId: ID!) {
    messages(conversationId: $conversationId) {
      id
      text
      createdAt
      sender {
        id
        email
        username
      }
    }
  }
`;

export const MESSAGE_ADDED = gql`
  subscription($conversationId: ID!) {
    messageAdded(conversationId: $conversationId) {
      id
      text
      createdAt
      sender {
        id
        email
        username
      }
    }
  }
`;
