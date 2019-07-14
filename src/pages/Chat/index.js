import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-apollo-hooks';
import styled from 'styled-components';

import Conversations from './components/Conversations';
import Teams from './components/Teams';
import Header from './components/Header';
import Messages from './components/Messages';
import SendMessage from './components/SendMessage';
import AddChannel from './components/AddChannel';
import InvitePeople from './components/InvitePeople';
import { GET_TEAMS } from './../../graphql/team';
import { GET_ME } from './../../graphql/user';

function getCurrentTeam(teams, conversationId) {
  return teams.find(team => {
    return (
      team.channels.some(
        channel => channel.conversation.id === conversationId
      ) ||
      team.members.some(member => member.conversation.id === conversationId)
    );
  });
}

const Container = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 100px 250px 1fr;
  grid-template-rows: auto 1fr auto;
`;

const Chat = ({ match, history }) => {
  const {
    loading,
    data: { teams = [] }
  } = useQuery(GET_TEAMS);
  const {
    data: { me = {} }
  } = useQuery(GET_ME);

  const [isAddChannelModalOpen, setIsAddChannelModalOpen] = useState(false);
  const [isInvitePeopleModalOpen, setIsInvitePeopleModalOpen] = useState(false);

  useEffect(() => {
    if (loading) {
      return;
    }

    if (teams.length === 0) {
      history.push('/create-team');
      return;
    }

    const currentTeam = getCurrentTeam(teams, conversationId);

    if (!currentTeam) {
      history.push(`/${teams[0].channels[0].conversation.id}`);
      return;
    }
  });

  if (loading) {
    return null;
  }

  const { conversationId } = match.params;

  const currentTeam = getCurrentTeam(teams, conversationId);

  if (!currentTeam) {
    return null;
  }

  const currentChannel = currentTeam.channels.find(
    channel => channel.conversation.id === conversationId
  );

  const currentMember = currentTeam.members.find(
    member => member.conversation.id === conversationId
  );

  const title = currentChannel ? currentChannel.name : currentMember.username;

  return (
    <Container>
      <Teams teams={teams} />

      <Conversations
        team={currentTeam}
        user={me}
        onAddChannelClick={() => setIsAddChannelModalOpen(true)}
        onInvitePeopleClick={() => setIsInvitePeopleModalOpen(true)}
        isInvitePeopleButtonAvailable={currentTeam.isAdmin}
      />

      <Header text={title} />

      <Messages conversationId={conversationId} me={me} />

      <SendMessage
        conversationId={conversationId}
        placeholder={`Message #${title}`}
      />

      <AddChannel
        teamId={currentTeam.id}
        open={isAddChannelModalOpen}
        onClose={() => setIsAddChannelModalOpen(false)}
      />

      <InvitePeople
        teamId={currentTeam.id}
        open={isInvitePeopleModalOpen}
        onClose={() => setIsInvitePeopleModalOpen(false)}
      />
    </Container>
  );
};

export default Chat;
