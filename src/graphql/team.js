import gql from 'graphql-tag';

export const GET_TEAMS = gql`
  {
    teams {
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
  }
`;

export const ADD_TEAM_MEMBER = gql`
  mutation($teamId: ID!, $email: String!) {
    addTeamMember(teamId: $teamId, email: $email) {
      id
      username
      conversation {
        id
        channelId
      }
    }
  }
`;
