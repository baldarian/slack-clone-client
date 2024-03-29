import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const TeamWrapper = styled.div`
  grid-column: 1;
  grid-row: 1 / 4;
  background-color: #362234;
  user-select: none;
`;

const TeamList = styled.ul`
  width: 100%;
  padding-left: 0px;
  list-style: none;
`;

const TeamListItem = styled.li`
  height: 50px;
  width: 50px;
  background-color: #676066;
  color: #fff;
  margin: auto;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  border-radius: 11px;
  cursor: pointer;
  &:hover {
    border-style: solid;
    border-width: thick;
    border-color: #767676;
  }
`;

const Teams = ({ teams, onPlusButtonClick }) => (
  <TeamWrapper>
    <TeamList>
      {teams.map(team => (
        <Link to={`/${team.channels[0].conversation.id}`} key={team.id}>
          <TeamListItem>{team.name.slice(0, 1)}</TeamListItem>
        </Link>
      ))}
      <TeamListItem onClick={onPlusButtonClick}>+</TeamListItem>
    </TeamList>
  </TeamWrapper>
);

export default Teams;
