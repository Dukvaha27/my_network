import React from 'react';
import styled from 'styled-components'
import {MdOutlineChatBubbleOutline, MdOutlinePeopleAlt, MdRssFeed} from "react-icons/md";
import {FiArrowUpRight, FiBriefcase, FiSearch} from "react-icons/fi";
import {AiOutlineBell} from "react-icons/ai";
import logo from '../../assets/header_logo.svg'
import avatar from '../../assets/Rectangle.svg'
import {BiDotsHorizontalRounded} from "react-icons/bi";

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  height: 80px;
  background-color: #FFFFFF;
  font-size: 14px;
`

const StyledHeaderBlock = styled.div`
  padding: 18px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-right:1px solid #F4F4F4 ;
  
  & > div {
    margin-right: 25px;
  }
  & > div > div {
    font-size: 20px;
    text-align: center;
  }
  & > h4 {
    margin:0 0 0 10px
  }
`
const StyledHeaderSearch = styled.div`
  position: relative;
  & > input {
    width: 300px;
    padding: 15px;
    font-size: 16px;
    padding-left: 40px;
    border: none;
    outline: none;
  }
  & > input::placeholder{
    color: #CECECE;
  }
`
const StyledSearchIcon = styled.span`
  position: absolute;
  left: 15px;
  top: 17px;
  font-size: 16px;
  color:#0275B1;
`

const StyledAboutBlock = styled.div`
  padding: 18px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-right:1px solid #F4F4F4 ;
  
  & > img {
    margin-right: 10px;
  }
  & > div > div > span {
    margin-right: 10px;
  }
`
const StyledViews = styled.span`
  color: #02B033;
;
`
const StyledAbout = styled.span`
color: #18181833;
;
`
const StyledOtherBlock = styled.div`
  padding: 18px 40px;
  border-right:1px solid #F4F4F4 ;
  text-align: center;
  
  & > span {
    font-size: 20px;
  }
  
  & > h4 {
    margin:0;
  }
`

const Header = () => {
    return (
        <StyledHeader>
           <StyledHeaderBlock>
               <img src={logo} alt=""/>
           </StyledHeaderBlock>
            <StyledHeaderBlock>
                <div>
                    <div><MdRssFeed /></div>
                    <span>FEED</span>
                </div>
                <div>
                    <div><MdOutlinePeopleAlt/></div>
                    <span>NETWORK</span>
                </div>
                <div>
                    <div><FiBriefcase /></div>
                    <span>JOBS</span>
                </div>
                <div>
                    <div><MdOutlineChatBubbleOutline /></div>
                    <span>CHATS</span>
                </div>
                <div>
                    <div><AiOutlineBell /></div>
                    <span>NOTICES</span>
                </div>
            </StyledHeaderBlock>
            <StyledHeaderBlock>
                <StyledHeaderSearch>
                    <StyledSearchIcon><FiSearch /></StyledSearchIcon>
                    <input type="text" placeholder='Search'/>
                </StyledHeaderSearch>
            </StyledHeaderBlock>
            <StyledAboutBlock>
                <img src={avatar} alt=""/>
                <div>
                    <div>
                        <span><b>D. KARGAEV</b></span>
                        <StyledAbout>YOU</StyledAbout>
                    </div>
                    <div>
                        <span> 367 views today</span>
                        <StyledViews>+32 <FiArrowUpRight/></StyledViews>
                    </div>
                </div>
            </StyledAboutBlock>
            <StyledOtherBlock>
                <span><BiDotsHorizontalRounded /></span>
                <h4>OTHER</h4>
            </StyledOtherBlock>
        </StyledHeader>
    );
};

export default Header;
