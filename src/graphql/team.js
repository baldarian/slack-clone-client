import gql from 'graphql-tag';
import { TEAM_FRAGMENT } from './fragments';

export const GET_TEAMS = gql`
  {
    teams {
      ...TeamFragment
    }
  }

  ${TEAM_FRAGMENT}
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

export const CREATE_TEAM = gql`
  mutation($name: String!) {
    createTeam(name: $name) {
      ...TeamFragment
    }
  }

  ${TEAM_FRAGMENT}
`;
