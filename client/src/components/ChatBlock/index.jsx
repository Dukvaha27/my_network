import React, { memo, useEffect, useRef, useState } from 'react';
import { BsEmojiSmileFill } from 'react-icons/bs';
import Picker from 'emoji-picker-react';
import styled from 'styled-components';
import { Done, DoneAll, Telegram } from '@mui/icons-material';
import propTypes from 'prop-types';
import { useAddMessagesMutation, useGetMessagesAllQuery,
  useGetMessagesQuery,
  useReadMessageMutation } from '../../store/features/messageApi';
import useOutSideAlerter from '../../hooks/useOutSideAlerter';
import Welcome from '../Welcome';
import { respondTo } from '../../utils/_variable';
import { Divider } from '../divider';
import useMessageState from '../../store/slice/message/useMessageState';
import { ws } from '../../utils/api';

function ChatBlock({ from, to, users }) {
  const [text, setText] = useState('');
  const { data } = useGetMessagesQuery({
    from, to,
  });
  const { data: allMessages } = useGetMessagesAllQuery();

  const [readMessage] = useReadMessageMutation();

  const { messages, setMessages, getLastMsg } = useMessageState();

  useEffect(() => {
    if (messages?.length) {
      readMessage({
        to: from, from: to,
      });
    }
  }, [messages]);

  const ref = useRef();

  useEffect(() => {
    setMessages(data);
  }, [data, from, to]);

  const user = users?.find(({ _id }) => _id === to);
  const [sendMessage] = useAddMessagesMutation();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiClick = (emojiObject) => {
    let message = text;
    message += emojiObject.emoji;
    setText(message);
  };
  ws.onopen = () => {
    ws.send(
      JSON.stringify({
        method: 'connection', id: from, to, user: user?.name,
      }),
    );
  };
  const sendMessageHandler = () => {
    if (text && from && to) {
      ws.send(
        JSON.stringify({
          method: 'connection',
          id: from,
          to,
          text,
          user: user?.name,
        }),
      );

      getLastMsg({
        messages: allMessages, to: from,
      });
      sendMessage({
        from, to, text,
      });
      setMessages([...messages, {
        fromSelf: true, text,
      }]);
      setText('');
    }
  };

  useEffect(() => {
    if (to) {
      const req = {
        method: 'readMsg', id: from, to,
      };
      if (text) req.text = text;
      ws.send(JSON.stringify(req));
    }
  }, [to]);

  ws.onmessage = (ev) => {
    const dataMsg = JSON.parse(ev.data);

    if (dataMsg.text) {
      getLastMsg({
        messages: [{
          fromSelf: false, text: dataMsg.text, toId: dataMsg.id,
        }],
        to: dataMsg.id,
      });
    }
    if (dataMsg.id === to) {
      setMessages([...messages, {
        fromSelf: false, text: dataMsg.text,
      }]);
    }
    if (dataMsg.to === from) {
      const map = messages?.map((message) => {
        if (message.isRead) {
          return message;
        }
        return {
          ...message, isRead: true,
        };
      });
      setMessages(map);
    }
  };

  useOutSideAlerter(ref, () => setShowEmojiPicker(false));
  return (
    <Container>
      <MessagesBlockStyled>
        {!to || !messages?.length ? (
          <Welcome isMessages={!messages?.length} selectUser={to} />
        ) : (
          messages?.map((message, idx) => (
            // eslint-disable-next-line react/no-array-index-key
            <RowStyled key={idx} from={message.fromSelf}>
              {message.text && (
                <span>
                  {message.text}
                  <div>
                    13-30
                    {message?.fromSelf
                      && (message.isRead ? <DoneAll /> : <Done />)}
                  </div>
                </span>
              )}
            </RowStyled>
          ))
        )}
      </MessagesBlockStyled>
      <hr />
      <Form>
        <input
          placeholder="Type a message here"
          value={text}
          onChange={({ target }) => setText(target.value)}
        />
        <EmojiBlock ref={ref}>
          <BsEmojiSmileFill
            color="gray"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          />
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
        </EmojiBlock>
        <Divider vertical height="1.5rem" />
        <SendIconStyled onClick={sendMessageHandler} />
      </Form>
    </Container>
  );
}

const Container = styled.div`
  width: calc(100vw - 4rem);
  height: calc(100vh - 8.5rem);
`;

const MessagesBlockStyled = styled.div`
  position: relative;
  height: inherit;
  overflow: auto;
  padding: 0 2rem;
`;

const Form = styled.div`
  ${respondTo.mobile`
    display:none;
  `}
  margin: 0 2rem;
  display: flex;
  align-items: center;
  input {
    width: calc(100% - 3rem);
    outline: none;
    background-color: inherit;
    border: none;
    ::placeholder {
      color: gray;
      font-weight: bold;
    }
  }
`;
const SendIconStyled = styled(Telegram)`
  color: cornflowerblue;
  width: 3.5rem;
  cursor: pointer;
`;

const RowStyled = styled.div`
  span {
    text-align: ${({ from }) => (from ? 'end' : 'start')};
    background: rgb(0, 44, 245);
    background: ${({ from }) => (!from
        ? 'linear-gradient(90deg, rgba(0,44,245,0.8113839285714286) 0%, rgba(0,239,255,1) 100%)'
        : 'transparent')};
    margin: 0.5rem 0;
    padding: 0.5rem 1rem;
    width: fit-content;
    max-width: 50%;
    border: ${({ from }) => from && '1px solid black'};
    border-radius: 10px;
    div {
      font-size: 10px;
      color: ${({ theme }) => theme.dark};
      display: flex;
      justify-content: end;
      align-items: center;
      margin-top: 0.5rem;
      svg {
        margin-left: 0.15rem;
        width: 10px !important;
        height: 10px !important;
      }
    }
  }
  display: flex;
  justify-content: ${({ from }) => (from ? 'end' : 'start')};
  color: ${({ from }) => (from ? 'red' : 'white')};
`;

const EmojiBlock = styled.div`
  position: relative;
  aside {
    position: absolute !important;
    bottom: 2.5rem;
    right: -3rem;
  }
  svg {
    font-size: 1.5rem;
    color: #ffff00c8;
    cursor: pointer;
  }
  .emoji-picker-react {
    position: absolute;
    top: -350px;
    background-color: #080420;
    box-shadow: 0 5px 10px #9a86f3;
    border-color: #9a86f3;
    .emoji-scroll-wrapper::-webkit-scrollbar {
      background-color: #080420;
      width: 5px;
      &-thumb {
        background-color: #9a86f3;
      }
    }
    .emoji-categories {
      button {
        filter: contrast(0);
      }
    }
    .emoji-search {
      background-color: transparent;
      border-color: #9a86f3;
    }
    .emoji-group:before {
      background-color: #080420;
    }
  }
`;

ChatBlock.propTypes = {
  from: propTypes.string.isRequired,
  to: propTypes.string.isRequired,
  users: propTypes.instanceOf(Array).isRequired,
};

export default memo(ChatBlock);
