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

const defaultTeam = {
  channels: []
};

const defaultChannel = {};

const ViewTeam = ({ match, history }) => {
  const {
    loading,
    data: { teams = [] }
  } = useQuery(GET_TEAMS);
  const {
    data: { me = {} }
  } = useQuery(GET_ME);

  const [isAddChannelModalOpen, setIsAddChannelModalOpen] = useState(false);
  const [isInvitePeopleModalOpen, setIsInvitePeopleModalOpen] = useState(false);

  const { teamId, channelId, type } = match.params;

  const currentTeam = teams.find(team => team.id === teamId) || defaultTeam;

  const currentChannel =
    (currentTeam &&
      currentTeam.channels.find(channel => channel.id === channelId)) ||
    defaultChannel;

  useEffect(() => {
    if (loading) {
      return;
    }

    if (!['channel', 'direct'].includes(type)) {
      history.push('/channel');
      return;
    }

    if (!teamId || (!loading && currentTeam === defaultTeam)) {
      history.push(`/${type}/${teams[0].id}`);
      return;
    }

    if (!channelId || (!loading && currentChannel === defaultChannel)) {
      history.push(`/${type}/${teamId}/${currentTeam.channels[0].id}`);
      return;
    }
  }, [
    channelId,
    currentChannel,
    currentTeam,
    history,
    loading,
    teamId,
    teams,
    type
  ]);

  const formattedTeams = teams.map(team => ({
    letter: team.name.charAt(0).toUpperCase(),
    ...team
  }));

  return (
    <AppLayout>
      <Teams teams={formattedTeams} />
      <Channels
        team={currentTeam}
        user={me}
        users={[{ id: 1, name: 'Slackbot' }, { id: 2, name: 'user1' }]}
        onAddChannelClick={() => setIsAddChannelModalOpen(true)}
        onInvitePeopleClick={() => setIsInvitePeopleModalOpen(true)}
        isInvitePeopleButtonAvailable={currentTeam.isAdmin}
      />
      <Header channelName={currentChannel.name} />
      {currentChannel.id && <Messages channelId={currentChannel.id} />}
      <SendMessage channel={currentChannel} />

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

export default ViewTeam;
