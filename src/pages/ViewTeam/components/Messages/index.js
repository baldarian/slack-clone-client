import React from 'react';
import styled from 'styled-components';
import { Comment, Message } from 'semantic-ui-react';
import { useQuery, useSubscription } from 'react-apollo-hooks';
import moment from 'moment';
import { GET_MESSAGES, MESSAGE_ADDED } from 'graphql/message';
import formatMessages from 'common/formatMessages';

const MessageContainer = styled.div`
  grid-column: 3;
  grid-row: 2;
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  flex-direction: column-reverse;
  overflow: auto;
`;

const NoMessageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const Messages = ({ channelId }) => {
  const {
    data: { messages = [] }
  } = useQuery(GET_MESSAGES, {
    variables: { channelId },
    fetchPolicy: 'cache-and-network'
  });

  useSubscription(MESSAGE_ADDED, {
    variables: {
      channelId
    },
    onSubscriptionData: ({ client, subscriptionData }) => {
      const { messages } = client.readQuery({
        query: GET_MESSAGES,
        variables: { channelId }
      });

      client.writeQuery({
        query: GET_MESSAGES,
        data: { messages: [...messages, subscriptionData.data.messageAdded] },
        variables: { channelId }
      });
    }
  });

  return (
    <MessageContainer>
      <Comment.Group>
        {messages.map(message => (
          <Comment key={message.id}>
            <Comment.Content>
              <Comment.Author as="a">{message.user.username}</Comment.Author>
              <Comment.Metadata>
                <div>
                  {moment(message.createdAt).format('dddd, MMMM D, YYYY h:mma')}
                </div>
              </Comment.Metadata>
              <Comment.Text style={{ display: 'flex' }}>
                {formatMessages(message.text)}
              </Comment.Text>
            </Comment.Content>
          </Comment>
        ))}
      </Comment.Group>
      {messages.length === 0 && (
        <NoMessageContainer>
          <Message compact>There are no messages yet in this channel</Message>
        </NoMessageContainer>
      )}
    </MessageContainer>
  );
};

export default Messages;
