import React, {useEffect, useRef, useState} from "react";
import { tokenSlct, useGetUsersQuery } from "../store/features/authApi";
import { useSelector } from "react-redux";
import styled from "styled-components";
import {
  useAddMessagesMutation,
  useGetMessagesQuery,
} from "../store/features/messageApi";
import { Telegram } from "@mui/icons-material";
import Welcome from "../components/Welcome";
import Picker from "emoji-picker-react";
import { BsEmojiSmileFill } from "react-icons/bs";
import useOutSideAlerter from "../components/useOutSideAlerter";

const Chat = () => {
  const token = useSelector(tokenSlct);
  const [to, setTo] = useState("");
  const {
    data: users,
    error,
    isLoading,
  } = useGetUsersQuery(token, { skip: !token });

  return (
    <div style={{ display: "flex" }}>
      {!isLoading && (
        <div style={{ width: "30%" }}>
          {users
            ?.filter(({ _id }) => _id !== token.user.id)
            .map(({ name, _id }) => (
              <p
                key={_id}
                onClick={() => setTo(_id)}
                style={{ margin: ".5rem 0" }}
              >
                {name}
              </p>
            ))}
        </div>
      )}
      <ChatBlock from={token?.user.id} to={to} users={users} />
    </div>
  );
};

export default Chat;

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
  };
  ws.onmessage = (ev) => {
    const data = JSON.parse(ev.data);

    if (data.id === to) {
      setMessages([...messages, { fromSelf: false, text: data.text }]);
    }
  };

  useOutSideAlerter(ref, () => setShowEmojiPicker(false))
  return (
    <Container>
      <MessagesBlockStyled>
        {!to || !messages?.length ? (
          <Welcome isMessages={!messages?.length} selectUser={to} />
        ) : (
          messages?.map((message, idx) => (
            <RowStyled key={idx} from={message.fromSelf && message.fromSelf}>
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
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          />
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
        </EmojiBlock>
        <SendIconStyled onClick={sendMessageHandler} />
      </Form>
    </Container>
  );
};
