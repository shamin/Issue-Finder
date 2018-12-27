import React from "react";
import styled from "styled-components";
import githubIcon from "../../assets/github-white.svg";

const CardStyles = styled.div`
  background: #4d5be7;
  color: #ffffff;
  border-radius: 10px;
  margin: 15px 10px;
  padding: 20px;
  .header {
    display: flex;
    align-items: center;
    .icon {
      width: 20px;
    }
    .repo {
      flex: 1;
      font-size: 16px;
      padding-left: 10px;
      font-weight: 500;
    }
    .date {
      font-weight: 300;
      font-size: 14px;
    }
  }
  .title {
    font-weight: 400;
    margin: 15px 0 8px 0;
    font-size: 15px;
  }
  .description {
    font-weight: 300;
    opacity: 0.6;
    font-size: 14px;
    text-overflow: ellipsis;
    overflow: hidden;
    height: 32px;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    display: -webkit-box;
  }
`;

const Card = props => {
  const { issue } = props;
  console.log(issue);
  return (
    <CardStyles>
      <div className="header">
        <img className="icon" src={githubIcon} />
        <p className="repo">{issue.repository.nameWithOwner}</p>
        {/* <p className="date">24-12-2018</p> */}
      </div>
      <p className="title">{issue.title}</p>
      <p className="description">{issue.bodyText}</p>
    </CardStyles>
  );
};

export default Card;
