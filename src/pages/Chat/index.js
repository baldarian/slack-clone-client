import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-apollo-hooks';

import AppLayout from './components/AppLayout';
import Channels from './components/Channels';
import Teams from './components/Teams';
import Header from './components/Header';
import Messages from './components/Messages';
import SendMessage from './components/SendMessage';
import AddChannel from './components/AddChannel';
import InvitePeople from './components/InvitePeople';
import { GET_TEAMS } from './../../graphql/team';
import { GET_ME } from './../../graphql/user';

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

    const currentTeam = teams.find(team => {
      return (
        team.channels.some(
          channel => channel.conversation.id === conversationId
        ) ||
        team.members.some(member => member.conversation.id === conversationId)
      );
    });

    if (!currentTeam) {
      history.push(`/${teams[0].channels[0].conversation.id}`);
      return;
    }
  });

  if (loading) {
    return null;
  }

  const { conversationId } = match.params;

  const currentTeam = teams.find(team => {
    return (
      team.channels.some(
        channel => channel.conversation.id === conversationId
      ) ||
      team.members.some(member => member.conversation.id === conversationId)
    );
  });

  if (!currentTeam) {
    return null;
  }

  const currentChannel = currentTeam.channels.find(
    channel => channel.conversation.id === conversationId
  );

  const currentMember = currentTeam.members.find(
    member => member.conversation.id === conversationId
  );

  return (
    <AppLayout>
      <Teams teams={teams} />
      <Channels
        team={currentTeam}
        user={me}
        onAddChannelClick={() => setIsAddChannelModalOpen(true)}
        onInvitePeopleClick={() => setIsInvitePeopleModalOpen(true)}
        isInvitePeopleButtonAvailable={currentTeam.isAdmin}
      />
      <Header
        text={currentChannel ? currentChannel.name : currentMember.username}
      />
      <Messages conversationId={conversationId} me={me} />
      <SendMessage
        conversationId={conversationId}
        placeholder={`Message #${
          currentChannel ? currentChannel.name : currentMember.username
        }`}
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
    </AppLayout>
  );
};

export default Chat;