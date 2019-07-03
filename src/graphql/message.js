import gql from 'graphql-tag';

export const CREATE_MESSAGE = gql`
  mutation($channelId: ID!, $text: String!) {
    createMessage(channelId: $channelId, text: $text) {
      id
      text
    }
  }
`;

export const GET_MESSAGES = gql`
  query($channelId: ID!) {
    messages(channelId: $channelId) {
      id
      text
      createdAt
      user {
        id
        email
        username
      }
    }
  }
`;

export const MESSAGE_ADDED = gql`
  subscription($channelId: ID!) {
    messageAdded(channelId: $channelId) {
      id
      text
      createdAt
      user {
        id
        email
        username
      }
    }
  }
`;
