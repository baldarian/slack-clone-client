import React, { useState, useEffect, useRef } from 'react';
import { renderToString } from 'react-dom/server';
import styled from 'styled-components';
import { useMutation } from 'react-apollo-hooks';
import { Icon } from 'semantic-ui-react';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';

import sheet from 'assets/sheet.jpg';
import { CREATE_MESSAGE } from 'graphql/message';
import {
  convertMessageFromEmojiesToKeys,
  convertMessageFromKeysToEmojies
} from 'common/formatMessages';

const SendMessageWrapper = styled.div`
  grid-column: 3;
  grid-row: 3;
  margin: 10px 20px;
  position: relative;
`;

const IconWrapper = styled.div`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  display: flex;
  cursor: pointer;
`;

const PickerWrapper = styled.div`
  position: absolute;
  right: 10px;
  bottom: 60px;
  visibility: ${props => (props.isPickerShown ? 'visible' : 'hidden')};
`;

const Input = styled.div`
  border: 1px solid #b3b3b3;
  height: 35px;
  line-height: 35px;
  cursor: text;
  padding-left: 10px;
  padding-right: 10px;
`;

const SendMessage = ({ conversationId, placeholder }) => {
  const input = useRef();
  const createMessage = useMutation(CREATE_MESSAGE);

  const picker = useRef();
  const [isPickerShown, setIsPickerShown] = useState();

  useEffect(() => {
    function hidePicker(e) {
      if (!picker.current.contains(e.target)) {
        setIsPickerShown(false);
      }
    }

    if (isPickerShown) {
      document.addEventListener('click', hidePicker);
    }

    return () => {
      if (isPickerShown) {
        document.removeEventListener('click', hidePicker);
      }
    };
  }, [isPickerShown]);

  return (
    <SendMessageWrapper>
      <Input
        contentEditable
        ref={input}
        placeholder={placeholder}
        onKeyDown={async e => {
          const message = convertMessageFromEmojiesToKeys(
            input.current.innerHTML
          );

          if (e.key === 'Enter') {
            e.preventDefault();

            if (message.trim() === '') {
              return;
            }

            await createMessage({
              variables: {
                text: message,
                conversationId
              }
            });

            input.current.innerHTML = '';
          }
        }}
      />

      <IconWrapper onClick={() => setIsPickerShown(!isPickerShown)}>
        <Icon name="smile outline" size="large" />
      </IconWrapper>

      <PickerWrapper isPickerShown={isPickerShown} ref={picker}>
        <Picker
          color="#4e3a4c"
          set="facebook"
          showPreview={false}
          showSkinTones={false}
          emojiTooltip
          backgroundImageFn={() => sheet}
          onSelect={emoji => {
            const messageWithKeys = convertMessageFromEmojiesToKeys(
              input.current.innerHTML
            );

            const newMessage = messageWithKeys + emoji.colons;

            input.current.innerHTML = renderToString(
              convertMessageFromKeysToEmojies(newMessage)
            );
          }}
        />
      </PickerWrapper>
    </SendMessageWrapper>
  );
};

export default SendMessage;
