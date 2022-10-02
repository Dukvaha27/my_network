import React from "react";
import styled from "styled-components";
import { FiPaperclip } from "react-icons/fi";
import { BsImages } from "react-icons/bs";
import { MdSend, MdVideoLibrary } from "react-icons/md";
import Button from "@mui/material/Button";
import { RiSendPlaneFill } from "react-icons/ri";

const StyledContainer = styled.div`
  width: 850px;
  height: 135px;
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0 20px 60px rgba(241, 244, 248, 0.5);
  padding: 25px;

  h5 {
    margin: 0 0 20px;
  }

  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #f4f4f4;
  }
  & > div > div {
    display: flex;
    align-items: center;
  }
`;

const StyledInput = styled.input`
  width: 600px;
  padding: 15px;
  font-size: 16px;
  margin-top: 10px;
  border: none;
  outline: none;

  &::placeholder {
    color: #18181833;
  }
`;

const StyledLabel = styled.label`
  cursor: pointer;
  font-size: 18px;
  color: #18181833;
  margin-right: 15px;

  & > input {
    display: none;
  }
`;

const StyledButton = styled.button`
  cursor: pointer;
  background: linear-gradient(180deg, #0077b5 0%, #0e6795 100%);
  border-radius: 4px;
  padding: 5px 6px 2px;
  color: white;
  font-size: 14px;
  border: none;
`;

const NewPost = () => {
  return (
    <StyledContainer>
      <h5>NEW POST</h5>
      <div>
        <StyledInput type="text" placeholder="What`s on your mind?" />
        <div>
          <StyledLabel htmlFor="inputClip">
            <FiPaperclip />
            <input type="file" id="inputClip" />
          </StyledLabel>
          <StyledLabel htmlFor="inputClip">
            <BsImages />
            <input type="file" id="inputClip" />
          </StyledLabel>
          <StyledLabel htmlFor="inputClip">
            <MdVideoLibrary />
            <input type="file" id="inputClip" />
          </StyledLabel>
          <StyledButton>
            <MdSend />
          </StyledButton>
        </div>
      </div>
    </StyledContainer>
  );
};

export default NewPost;
