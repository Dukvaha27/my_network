import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../../assets/robot.gif";
import { useSelector } from "react-redux";
import { tokenSlct } from "../../store/features/authApi";

export default function Welcome({ isMessages, selectUser }) {
  const { user = '' } = useSelector(tokenSlct);

  const [username, setUsername] = useState('');

  useEffect(() => {
      setUsername(user.name)
  },[user])
  const EmptyMessagesBlock = <div>Здесть пока ничего нет...</div>;

  const SelectUser = (
    <>
      <img src={Robot} alt="" />
      <h1>
        Welcome, <span>{username}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </>
  );

  return (
    <Container>
      {selectUser ? EmptyMessagesBlock : SelectUser}
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #493e3e;
  flex-direction: column;

  img {
    height: 20rem;
  }

  span {
    color: #4e0eff;
  }
`;
