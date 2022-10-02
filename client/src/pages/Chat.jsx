import React, { useState } from "react";
import { tokenSlct, useGetUsersQuery } from "../store/features/authApi";
import { useSelector } from "react-redux";
import ChatBlock from "../components/ChatBlock";
import styled from "styled-components";
import UserList from "../components/ChatBlock/UserList";

const Container = styled.div`
  display: flex;
  width: 1180px;
  margin: auto;
`;

const Chat = () => {
  const token = useSelector(tokenSlct);
  const [to, setTo] = useState("");
  const {
    data: users,
    error,
    isLoading,
    refetch,
  } = useGetUsersQuery(token, { skip: !token });

  return (
    <Container>
      {!isLoading && (
        <UserListContainerStyled>
          {users
            ?.filter(({ _id }) => _id !== token.user.id)
            .map(({ name, _id }) => (
              <UserList
                key={_id}
                setTo={setTo}
                name={name}
                from={token?.user.id}
                to={_id}
              />
            ))}
        </UserListContainerStyled>
      )}
      <ChatBlock from={token?.user.id} to={to} users={users} />
    </Container>
  );
};

const UserListContainerStyled = styled.div`
  width: 30%;
  div {
    border-bottom: 1px solid black;
  }
  & > :last-child {
    border-bottom: none;
  }
`;

export default Chat;
