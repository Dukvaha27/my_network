import React, { memo, useEffect, useState } from "react";
import styled from "styled-components";
import { useGetMessagesQuery } from "../../store/features/messageApi";

const UserList = ({ name, setTo, from, to }) => {
  const { data: messages } = useGetMessagesQuery({ from, to });
  const [lastMessage, setLastMessage] = useState({});

  useEffect(() => {
    const last = messages?.[messages?.length - 1];
    setLastMessage(last);
  }, [messages]);

  return (
    <ListStyled onClick={() => setTo(to)}>
      {name}
      <LastMessageStyled>
        {lastMessage?.fromSelf ? "Your" : name}:<span>{lastMessage?.text}</span>
      </LastMessageStyled>
    </ListStyled>
  );
};

const ListStyled = styled.div`
  padding: 0.5rem 1rem;
  font-weight: bold;
`;

const LastMessageStyled = styled.div`
  font-size: 10px;
  border: none !important;
  color: #75adef;
  font-weight: lighter;
  text-transform: lowercase;
  display: flex;
  span {
    color: gray;
    overflow: hidden;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    display: -webkit-box;
  }
`;

export default memo(UserList);
