import React from 'react';
import styled from 'styled-components';
import NewPost from '../components/layouts/NewPost';

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 40px 130px;
`;

function Main() {
  return (
    <StyledContainer>
      <NewPost />
    </StyledContainer>
  );
}

export default Main;
