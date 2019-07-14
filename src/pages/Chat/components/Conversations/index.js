import React from 'react';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const ChannelWrapper = styled.div`
  grid-column: 2;
  grid-row: 1 / 4;
  background-color: #4e3a4c;
  color: #958993;
  user-select: none;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const TeamNameHeader = styled.h1`
  color: #fff;
  font-size: 20px;
`;

const SideBarList = styled.ul`
  width: 100%;
  list-style: none;
  padding-left: 0px;
`;

const paddingLeft = 'padding-left: 10px';

const SideBarListItem = styled.li`
  padding: 2px;
  ${paddingLeft};
  &:hover {
    background: #3e313c;
  }
`;

const SideBarListHeader = styled.li`
  ${paddingLeft};
`;

const PushLeft = styled.div`
  ${paddingLeft};
`;

const Green = styled.span`
  color: #38978d;
`;

const InvitePeople = styled.div`
  padding-left: 10px;
  cursor: pointer;
`;

const Bubble = ({ on = true }) => (on ? <Green>●</Green> : '○');

const Conversations = ({
  team,
  user,
  users,
  onAddChannelClick,
  onInvitePeopleClick,
  isInvitePeopleButtonAvailable
}) => (
  <ChannelWrapper>
    <PushLeft>
      <TeamNameHeader>{team.name}</TeamNameHeader>
      {user.username}
    </PushLeft>
    <div>
      <SideBarList>
        <SideBarListHeader>
          Channels <Icon name="add circle" onClick={onAddChannelClick} />
        </SideBarListHeader>
        {team.channels.map(({ id, name, conversation }) => (
          <Link to={`/${conversation.id}`} key={id}>
            <SideBarListItem># {name}</SideBarListItem>
          </Link>
        ))}
      </SideBarList>
    </div>
    <div>
      <SideBarList>
        <SideBarListHeader>Direct Messages</SideBarListHeader>
        {team.members.map(({ id, username, conversation }) => (
          <Link to={`/${conversation.id}`} key={id}>
            <SideBarListItem key={id}>
              <Bubble /> {username}
            </SideBarListItem>
          </Link>
        ))}
      </SideBarList>
    </div>
    {isInvitePeopleButtonAvailable && (
      <InvitePeople onClick={onInvitePeopleClick}>+ Invite People</InvitePeople>
    )}
  </ChannelWrapper>
);

export default Conversations;
