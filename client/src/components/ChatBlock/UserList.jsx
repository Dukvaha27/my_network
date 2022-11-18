import React, { memo, useEffect } from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';
import { useGetMessagesQuery } from '../../store/features/messageApi';
import useMessageState from '../../store/slice/message/useMessageState';

function UserList({ name, setTo, from, to }) {
  const { data: messages } = useGetMessagesQuery({
    from, to,
  });
  const { last_message, getLastMsg } = useMessageState();

  useEffect(() => {
    if (messages?.length) {
      getLastMsg({
        messages, to,
      });
    }
  }, [messages]);

  return (
    <ListStyled onClick={() => setTo(to)}>
      {name}
      <LastMessageStyled>
        {last_message[to]?.fromSelf ? 'Your' : name}
        :
        <span>{last_message[to]?.text}</span>
      </LastMessageStyled>
    </ListStyled>
  );
}

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

UserList.propTypes = {
  name: propTypes.string.isRequired,
  setTo: propTypes.func.isRequired,
  from: propTypes.string.isRequired,
  to: propTypes.string.isRequired,
};

export default memo(UserList);
