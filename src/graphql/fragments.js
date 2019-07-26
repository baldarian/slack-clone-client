import gql from 'graphql-tag';

export const TEAM_FRAGMENT = gql`
  fragment TeamFragment on Team {
    id
    name
    isAdmin
    channels {
      id
      name
      conversation {
        id
        channelId
      }
    }
    members {
      id
      username
      conversation {
        id
        channelId
      }
    }
  }
`;
