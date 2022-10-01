import React, { memo, useEffect, useRef, useState } from "react";
import {
  useAddMessagesMutation,
  useGetMessagesQuery,
} from "../../store/features/messageApi";
import useOutSideAlerter from "../useOutSideAlerter";
import Welcome from "../Welcome";
import { BsEmojiSmileFill } from "react-icons/bs";
import Picker from "emoji-picker-react";
import styled from "styled-components";
import { respondTo } from "../../utils/_variable";
import { Telegram } from "@mui/icons-material";
import { Divider } from "../divider";

const ws = new WebSocket("ws://localhost:4000");

const ChatBlock = ({ from, to, users }) => {
  const [text, setText] = useState("");
  const { data } = useGetMessagesQuery({ from, to });
  const [messages, setMessages] = useState([]);

  const ref = useRef();
  useEffect(() => {
    setMessages(data);
  }, [data]);

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
      JSON.stringify({ method: "connection", id: from, to, user: user?.name })
    );
  };
  const sendMessageHandler = () => {
    if (text && from && to) {
      ws.send(
        JSON.stringify({
          method: "connection",
          id: from,
          to,
          text,
          user: user?.name,
        })
      );

      sendMessage({ from, to, text });
      setMessages([...messages, { fromSelf: true, text }]);
      setText("");
    }
  };
  ws.onmessage = (ev) => {
    const data = JSON.parse(ev.data);

    if (data.id === to) {
      setMessages([...messages, { fromSelf: false, text: data.text }]);
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
            <RowStyled key={idx} from={message.fromSelf}>
              <span>{message.text}</span>
            </RowStyled>
          ))
        )}
      </MessagesBlockStyled>
      <hr />
      <Form>
        <input
          placeholder={"Type a message here"}
          value={text}
          onChange={({ target }) => setText(target.value)}
        />
        <EmojiBlock ref={ref}>
          <BsEmojiSmileFill
            color={"gray"}
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          />
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
        </EmojiBlock>
        <Divider vertical height={"1.5rem"} />
        <SendIconStyled onClick={sendMessageHandler} />
      </Form>
    </Container>
  );
};

const Container = styled.div`
  width: calc(100vw - 4rem);
  height: calc(100vh - 3rem);
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
    text-align: ${({ from }) => (from ? "end" : "start")};
    background: rgb(0, 44, 245);
    background: ${({ from }) =>
      !from
        ? "linear-gradient(90deg, rgba(0,44,245,0.8113839285714286) 0%, rgba(0,239,255,1) 100%)"
        : "transparent"};
    margin: 0.5rem 0;
    padding: 0.5rem 1rem;
    width: fit-content;
    max-width: 50%;
    border: ${({ from }) => from && "1px solid black"};
    border-radius: 10px;
  }
  display: flex;
  justify-content: ${({ from }) => (from ? "end" : "start")};
  color: ${({ from }) => (from ? "red" : "white")};
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

export default memo(ChatBlock);
