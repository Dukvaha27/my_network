import React from "react";
import styled from "styled-components";
import {
  MdOutlineChatBubbleOutline,
  MdOutlinePeopleAlt,
  MdRssFeed,
} from "react-icons/md";
import { FiArrowUpRight, FiBriefcase, FiSearch } from "react-icons/fi";
import { AiOutlineBell } from "react-icons/ai";
import logo from "../../assets/header_logo.svg";
import avatar from "../../assets/Rectangle.svg";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { tokenSlct } from "../../store/features/authApi";
import BasicMenu from "./Dashboard";

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  height: 80px;
  background-color: #ffffff;
  font-size: 14px;
`;

const StyledHeaderBlock = styled.div`
  padding: 18px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-right: 1px solid #f4f4f4;

  .active_navlink {
    color: #0275b1;
  }

  .nav_link {
    color: #505050;
  }

  & > a {
    margin-right: 25px;
    text-decoration: none;
  }

  & > a > div {
    font-size: 20px;
    text-align: center;
  }

  & > h4 {
    margin: 0 0 0 10px;
  }
`;
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
  & > input::placeholder {
    color: #cecece;
  }
`;
const StyledSearchIcon = styled.span`
  position: absolute;
  left: 15px;
  top: 17px;
  font-size: 16px;
  color: #0275b1;
`;

const StyledAboutBlock = styled.div`
  padding: 18px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-right: 1px solid #f4f4f4;

  & > img {
    margin-right: 10px;
  }
  & > div > div > span {
    margin-right: 10px;
  }
`;
const StyledViews = styled.span`
  color: #02b033; ;
`;
const StyledAbout = styled.span`
  color: #18181833; ;
`;
const StyledOtherBlock = styled.div`
  padding: 18px 40px;
  border-right: 1px solid #f4f4f4;
  text-align: center;

  & > span {
    font-size: 20px;
  }
`;

const Header = () => {
  const { user } = useSelector(tokenSlct);

  return (
    <StyledHeader>
      <NavLink to={"/"}>
        <StyledHeaderBlock>
          <img src={logo} alt="" />
        </StyledHeaderBlock>
      </NavLink>
      <StyledHeaderBlock>
        <NavLink
          to="/feed"
          className={({ isActive }) =>
            isActive ? "active_navlink" : "nav_link"
          }
        >
          <div>
            <MdRssFeed />
          </div>
          <span>FEED</span>
        </NavLink>
        <NavLink
          to="/network"
          className={({ isActive }) =>
            isActive ? "active_navlink" : "nav_link"
          }
        >
          <div>
            <MdOutlinePeopleAlt />
          </div>
          <span>NETWORK</span>
        </NavLink>
        <NavLink
          to="/jobs"
          className={({ isActive }) =>
            isActive ? "active_navlink" : "nav_link"
          }
        >
          <div>
            <FiBriefcase />
          </div>
          <span>JOBS</span>
        </NavLink>
        <NavLink
          to="/chat"
          className={({ isActive }) =>
            isActive ? "active_navlink" : "nav_link"
          }
        >
          <div>
            <MdOutlineChatBubbleOutline />
          </div>
          <span>CHATS</span>
        </NavLink>
        <NavLink
          to="/notices"
          className={({ isActive }) =>
            isActive ? "active_navlink" : "nav_link"
          }
        >
          <div>
            <AiOutlineBell />
          </div>
          <span>NOTICES</span>
        </NavLink>
      </StyledHeaderBlock>
      <StyledHeaderBlock>
        <StyledHeaderSearch>
          <StyledSearchIcon>
            <FiSearch />
          </StyledSearchIcon>
          <input type="text" placeholder="Search" />
        </StyledHeaderSearch>
      </StyledHeaderBlock>
      <StyledAboutBlock>
        <img src={avatar} alt="" />
        <div>
          <div>
            <span>
              <b>{user.name}</b>
            </span>
            <StyledAbout>YOU</StyledAbout>
          </div>
          <div>
            <span> 367 views today</span>
            <StyledViews>
              +32 <FiArrowUpRight />
            </StyledViews>
          </div>
        </div>
      </StyledAboutBlock>
      <StyledOtherBlock>
        <BasicMenu />
      </StyledOtherBlock>
    </StyledHeader>
  );
};

export default Header;
