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
      }
    }
  }
`;

export const ADD_TEAM_MEMBER = gql`
  mutation($teamId: ID!, $email: String!) {
    addTeamMember(teamId: $teamId, email: $email)
  }
`;
