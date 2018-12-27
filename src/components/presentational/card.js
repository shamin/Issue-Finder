import React from "react";
import styled from "styled-components";
import githubIcon from "../../assets/github-white.svg";

const CardStyles = styled.div`
  background: #4d5be7;
  color: #ffffff;
  border-radius: 20px;
  margin: 15px 10px;
  padding: 25px 20px;
  a {
    text-decoration: none;
    color: #ffffff;
  }
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
    display: block;
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
    line-height: 16px;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    display: -webkit-box;
  }
`;

const Card = props => {
  const { issue } = props;
  return (
    <CardStyles>
      <div className="header">
        <img className="icon" src={githubIcon} />
        <a className="repo" href={issue.repository.url} target="_blank">
          {issue.repository.nameWithOwner}
        </a>
        {/* <p className="date">24-12-2018</p> */}
      </div>
      <a className="title" href={issue.url} target="_blank">
        {issue.title}
      </a>
      <p className="description">{issue.bodyText}</p>
    </CardStyles>
  );
};

export default Card;
