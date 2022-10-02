import React from "react";
import NewPost from "../components/layouts/NewPost";
import styled from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 40px 130px;
`;

const Main = () => {
  return (
    <StyledContainer>
      <NewPost />
    </StyledContainer>
  );
};

export default Main;
